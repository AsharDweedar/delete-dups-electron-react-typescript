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

import { ProcessActions } from "../../actions";
import { RootState } from "../../reducers";

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
resetDB(FoldersDB);
resetDB(FilesDB);

interface FileDBModel {
  paths: string[];
  _id: string;
  _rev: string;
}
interface FileMsgModel {
  path: string;
  folder: string;
  lsLength: number;
  hash: string;
  doneWithCount: number;
}
interface FolderDBModel {
  doneLength: number;
  lsLength: number;
  path: string;
  _id: string;
  _rev: string;
}

export namespace GetStarted {
  export interface Props extends RouteComponentProps<void> {
    fullState: RootState;
    actions: {
      ScanStatus: Function;
      toggleScanOnGoing: Function;
    };
  }
}

function Scanner(state: RootState | undefined, actions: ProcessActions) {
  if (state) {
    ipcRenderer.on("scan-response", (_event: any, arg: any) => {
      switch (arg["type"]) {
        case "file":
          saveFileToDB(arg, actions, state);
          break;

        case "folder":
          saveFolderToDB(arg, actions, state, 20);
          break;

        default:
          break;
      }
    });

    ipcRenderer.send("request-scan-action", state.paths);
  }
}

function saveFileToDB(
  arg: FileMsgModel,
  actions: ProcessActions,
  state: RootState
) {
  var { hash, path } = arg;
  var cb = () =>
    saveFolderToDB(
      {
        path: arg.folder,
        lsLength: arg.lsLength,
        doneWithCount: arg.doneWithCount,
      },
      actions,
      state,
      20
    );
  FilesDB.get(hash)
    .then((doc: FileDBModel) => {
      var obj = {
        _id: doc._id,
        _rev: doc._rev,
        paths: doc.paths.concat([path]),
      };
      FilesDB.put(obj)
        .then(() => {})
        .catch((err: any) => {
          console.log("update for path error: ", path);
        });
      cb();
    })
    .catch(() => {
      FilesDB.put({ _id: hash, paths: [path] })
        .then(() => cb())
        .catch((err: any) => {
          cb();
          console.log("insert file error: ", path);
        });
    });
}

function handleSubFolder(
  folder: { path: string; lsLength: number },
  _actions: ProcessActions,
  _state: RootState,
  retries: number
) {
  console.log("done inside fub folder: ", folder, " retries: ", retries);
}

function saveFolderToDB(
  folder: { path: string; lsLength: number; doneWithCount: number },
  actions: ProcessActions,
  state: RootState,
  retries: number
) {
  console.log("saveFolderToDB, re-try number : ", retries);
  let { path, lsLength, doneWithCount } = folder;
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
        doneLength: doneWithCount,
        lsLength: lsLength,
      })
        .then((res: any) => {
          let isDone = doneWithCount / lsLength == 1;
          console.log("isDone", isDone, "old.doneLength", doneWithCount);
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
          if (--retries == 0) return console.log("allll tries failed err : ", err);
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
    var actions = bindActionCreators(omit(ProcessActions, "Type"), dispatch);
    return {
      actions: {
        ScanStatus: function(state: RootState) {
          getScanStatus(state, actions);
        },
        toggleScanOnGoing: (state: RootState) => Scanner(state, actions),
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
    this.props.actions.toggleScanOnGoing(this.props.fullState);
  }

  render() {
    let state = this.props.fullState;
    console.log("...........................................");
    console.log(state.process.progress);
    console.log("...........................................");
    let allPathsCount = state.paths.length;
    let percent = (state.process.progress / allPathsCount) * 100;
    return (
      <div>
        <div className={style.container1}>
          <Options />
          <a
            onClick={this.startScan}
            className="waves-effect waves-light btn-large right"
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
          <InputListPaths />
          <InputListExts />
        </div>
      </div>
    );
  }
}
