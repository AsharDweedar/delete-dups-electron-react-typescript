import * as React from "react";
import * as style from "./style.css";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import { omit } from "../../utils";
import { ipcRenderer } from "electron";

import { Options } from "../Options";
import { InputListPaths } from "../InputListPaths";
import { InputListExts } from "../InputListExt";

import { ProcessActions, PathActions } from "../../actions";
import { RootState } from "../../reducers";
import { PathModel } from "app/models";
import DB from "app/db/bin";

const { FilesDB, FoldersDB } = DB;

function resetDB(db: any) {
  db.allDocs()
    .then(function(result: any) {
      return Promise.all(
        result.rows.map(function(row: any) {
          return db.remove(row.id, row.value.rev);
        })
      );
    })
    .then(function() {
      db.allDocs().then(function(result: any) {
        console.log(result);
      });
    });
}

interface FileDBModel {
  paths: string[];
  _id: string;
  _rev: string;
}
type AllActions = ProcessActions & PathActions;
interface FileMsgModel {
  path: string;
  folder: string;
  lsLength: number;
  hash: string;
  doneWithCount: number;
} /* 
interface FolderDBModel {
  doneLength: number;
  lsLength: number;
  path: string;
  _id: string;
  _rev: string;
} */

export namespace GetStarted {
  export interface Props extends RouteComponentProps<void> {
    fullState: RootState;
    actions: {
      resetDB: Function;
      ScanStatus: Function;
      startScan: Function;
      toggleScanOnGoing: Function;
    } & PathActions;
  } // TODO: do i need to send PathActions?
}

function toggleFolderDone(
  { path }: { path: string },
  state: RootState | undefined,
  actions: AllActions
) {
  console.log("toggleFolderDone");
  if (state) {
    let exists = state.paths.filter((ele: PathModel) => ele.path == path);
    console.log(exists);
    if (exists[0]) {
      console.log("toggling ", exists[0]);
      actions.completeAll(exists[0]);
    }
  }
}

function Scanner(state: RootState | undefined, actions: AllActions) {
  console.log("Scanner");
  if (state) {
    ipcRenderer.on("scan-response", (_event: any, arg: any) => {
      switch (arg["type"]) {
        case "file":
          saveFileToDB(arg, actions, state, 1);
          break;

        case "folder":
          toggleFolderDone(arg, state, actions);
          // saveFolderToDB({ ...arg, path: arg.folder }, actions, state, 1);
          break;

        default:
          break;
      }
    });
    actions.toggleScanOnGoing(state);
    console.log("actions.toggleScanOnGoing");
    ipcRenderer.send("request-scan-action", state.paths);
  }
}

function saveFileToDB(
  arg: FileMsgModel,
  actions: AllActions,
  state: RootState,
  retries: number
) {
  var { hash, path } = arg;
  var cb = () => {
    console.log(retries);
    if (--retries) saveFileToDB(arg, actions, state, retries);
  };
  FilesDB.get(hash)
    .then((doc: FileDBModel) => {
      var obj = {
        ...doc,
        paths: [...doc.paths, path],
      };
      FilesDB.put(obj)
        .then(() => {})
        .catch(
          (err: any) => (
            console.log("update for path error: ", path, " err: ", err), cb()
          )
        );
    })
    .catch(() => {
      FilesDB.put({ _id: hash, paths: [path] })
        .then(() => cb())
        .catch(() => (console.log("insert file error: ", path), cb()));
    });
}
/* 
function handleSubFolder(
  folder: { path: string; lsLength: number },
  _actions: AllActions,
  _state: RootState,
  retries: number
) {
  console.log("done inside fub folder: ", folder, " retries: ", retries);
} */
/* 
function saveFolderToDB(
  folder: { path: string; lsLength: number; doneWithCount: number },
  actions: AllActions,
  state: RootState,
  retries: number
) {
  console.log("saveFolderToDB, re-try number : ", retries);
  let { path, lsLength } = folder;
  // let { path, lsLength, _doneWithCount } = folder;
  let fromState = state.paths.filter(ele => ele.path == path);
  let pathFromState = fromState[0];
  if (!fromState.length)
    return handleSubFolder(folder, actions, state, retries);

  FoldersDB.get(`${pathFromState.id}`)
    .then((old: FolderDBModel) => {
      FoldersDB.put({
        _id: `${pathFromState.id}`,
        _rev: old._rev,
        path: path,
        // doneLength: doneWithCount,
        doneLength: old.doneLength + 1,
        lsLength: lsLength,
      })
        .then((res: any) => {
          let isDone = old.doneLength / lsLength == 1;
          console.log("isDone", isDone, "old.doneLength", old.doneLength);
          if (isDone) {
            let oldProgress = state.process.progress;
            let newState = {
              ...state,
              process: { ...state.process, progress: oldProgress + 1 },
            };
            console.log(newState);
            // TODO: add toggle folder scan complete here
            actions.changeScanProgress(newState);
          }
        })
        .catch((err: any) => {
          if (--retries == 0)
            return console.log("allll tries failed err : ", err);
          saveFolderToDB(folder, actions, state, retries);
        });
    })
    .catch(() => {
      FoldersDB.put({
        _id: `${pathFromState.id}`,
        path: path,
        doneLength: 1,
        lsLength: lsLength,
      })
        .then(() => {})
        .catch((err: any) => {
          console.log("insert folder: " + path + "with err: ", err);
          if (--retries == 0) return console.log("allll tries failed");
          saveFolderToDB(folder, actions, state, retries);
        });
    });
}
 */
async function getScanStatus(
  state: RootState | undefined,
  actions: ProcessActions
) {
  if (state) {
    FoldersDB.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((result: any) => {
        result = result.map((ele: { doc: object }) => ele.doc);
        console.log("***************** result result result result");
        console.log(result);
        let foldersCount = state.paths.length;
        let doneCount = 0;
        for (var pathMod of state.paths) {
          if (result.includes(pathMod)) doneCount++;
          console.log("inside for each");
        }
        console.log("after for each");
        if (doneCount == foldersCount) {
          let newState = { ...state, progress: foldersCount };
          actions.toggleScanOnGoing(newState);
        } else {
          let newState = { ...state, progress: doneCount };
          actions.changeScanProgress(newState);
        }

        console.log("res in FoldersDB.allDocs", result);
      })
      .catch((err: any) => console.log("err in FoldersDB.allDocs", err));
  }
}
@connect(
  (state: RootState): Pick<GetStarted.Props, "fullState"> => {
    return { fullState: state };
  },
  (dispatch: Dispatch): Pick<GetStarted.Props, "actions"> => {
    var processActions = bindActionCreators(
      omit(ProcessActions, "Type"),
      dispatch
    );
    var pathActions = bindActionCreators(omit(PathActions, "Type"), dispatch);
    const allActions = { ...processActions, ...pathActions };
    return {
      actions: {
        ...pathActions,
        ScanStatus: function(state: RootState) {
          getScanStatus(state, allActions);
        },
        startScan: (state: RootState) => Scanner(state, allActions),
        toggleScanOnGoing: (state: RootState) => {
          processActions.toggleScanOnGoing(state);
        },
        resetDB: () => {
          resetDB(FoldersDB);
          resetDB(FilesDB);
        },
      },
    };
  }
)
export class GetStarted extends React.Component<GetStarted.Props, {}> {
  constructor(props: GetStarted.Props, context?: any) {
    super(props, context);
    this.startScan = this.startScan.bind(this);
  }

  startScan() {
    if (this.props.fullState.process.scanOnGoing) return;
    this.props.actions.startScan(this.props.fullState);
  }

  componentDidMount() {
    let state = this.props.fullState;
    let notDone = state.paths.filter((ele: PathModel) => !ele.scan_completed)
      .length;
    if (state.process.scanOnGoing && notDone == 0) {
      this.props.actions.toggleScanOnGoing(state);
    }
  }

  render() {
    let state = this.props.fullState;
    let donePaths = state.paths.filter((e: PathModel) => e.scan_completed)
      .length;
    // console.log("re-render GetStarted..................");
    // console.log(donePaths);
    // console.log("re-render GetStarted..................");
    let allPathsCount = state.paths.length;
    let percent = (donePaths / allPathsCount) * 100;
    let isDisabled = state.process.scanOnGoing ? "disabled" : "";
    return (
      <div>
        <div className={style.container1}>
          <Options />
          <a
            onClick={this.startScan}
            className={`waves-effect waves-light btn-large right ${isDisabled}`}
            style={{ margin: "2.5em" }}
          >
            <i className="material-icons left">cloud</i>
            Start Scanning
          </a>
        </div>

        <div className="progress">
          <div className="determinate" style={{ width: `${percent}%` }} />
        </div>

        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "flex-start",
          }}
        >
          <InputListPaths
            scanning={state.process.scanOnGoing}
            toggleScanOnGoing={() =>
              this.props.actions.toggleScanOnGoing(state).bind(this)
            }
          />
          <InputListExts />
        </div>
      </div>
    );
  }
}
