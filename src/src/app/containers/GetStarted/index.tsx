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

type AllActions = ProcessActions & PathActions;
interface FileMsgModel {
  path: string;
  folder: string;
  lsLength: number;
  hash: string;
  doneWithCount: number;
}

export namespace GetStarted {
  export interface Props extends RouteComponentProps<void> {
    fullState: RootState;
    actions: {
      resetDB: Function;
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
          saveFileToDB(arg, 1);
          break;

        case "folder":
          toggleFolderDone(arg, state, actions);
          break;

        default:
          break;
      }
    });
    console.log("ipcRenderer 111111");
    ipcRenderer.send("request-scan-action", state.paths);
    console.log("actions.toggleScanOnGoing 22222");
    actions.toggleScanOnGoing(state);
  }
}

function saveFileToDB(arg: FileMsgModel, retries: number) {
  var { hash, path } = arg;
  var obj = { path: path, hash: hash, _id: `${Math.random() * 100}` };
  FilesDB.put(obj)
    .then(() => {})
    .catch((err: any) => {
      console.log("update for path error: ", path, " err: ", err);
      if (--retries) saveFileToDB(arg, retries);
    });
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
        startScan: (state: RootState) => Scanner(state, allActions),
        toggleScanOnGoing: (state: RootState) => {
          console.log(
            "actions to the getstarted smart component: toggleScanOnGoing"
          );
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

  toggleScanOnGoing() {
    this.props.actions.toggleScanOnGoing(this.props.fullState);
  }

  startScan() {
    if (this.props.fullState.process.scanOnGoing) return;
    this.props.actions.startScan(this.props.fullState);
  }

  // componentDidUpdate(prevProps: GetStarted.Props, _prevState: {}) {
  //   console.log("componentDidUpdate inside get started, prevProps: ", prevProps);
  //   let state = this.props.fullState;
  //   let notDone = state.paths.filter((ele: PathModel) => !ele.scan_completed)
  //     .length;
  //   console.log(
  //     "getStarted : state.process.scanOnGoing",
  //     state.process.scanOnGoing
  //   );
  //   console.log("getStarted : notDone", notDone);
  //   if (state.process.scanOnGoing && notDone == 0) {
  //     this.props.actions.toggleScanOnGoing(state);
  //   }
  // }

  render() {
    let state = this.props.fullState;
    let donePaths = state.paths.filter((e: PathModel) => e.scan_completed)
      .length;
    console.log("re-render GetStarted..................");
    console.log("state", state);
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
            toggleScanOnGoing={this.toggleScanOnGoing.bind(this)}
          />
          <InputListExts />
        </div>
      </div>
    );
  }
}
