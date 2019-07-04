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
import { PathModel } from "../../models";

import DB from "../../../db/bin";

const FilesDB = DB.FilesDB;
const FoldersDB = DB.FoldersDB;

interface FileDBModel {
  paths: string[];
  id: string;
}
interface FolderDBModel {
  status: string;
  path: string[];
  id: string;
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
  console.log("Scanner **********");
  if (state) {
    ipcRenderer.on("scan-response", (_event: any, arg: any) => {
      switch (arg["type"]) {
        case "file":
          saveFileToDB(arg["hash"], arg["path"]);
          break;

        case "folder":
          console.log("notified folder 22222222222", arg.path);
          let fromState = state.paths.filter(ele => ele.path == arg.path);
          if (fromState.length) {
            saveFolderToDB(arg, fromState[0], () => {
              let oldProgress = state.process.progress;
              let newState = {
                ...state,
                process: { ...state.process, progress: oldProgress + 1 },
              };
              actions.changeScanProgress(newState);
            });
          } else {
            console.log("subfolder is not saved to db: ", arg["path"]);
          }
          break;

        default:
          break;
      }
    });

    ipcRenderer.send("request-scan-action", state.paths);
  }
}

function saveFileToDB(hash: string, innerFile: string) {
  FilesDB.get(hash)
    .then((doc: FileDBModel) => {
      FilesDB.put({ ...doc, path: doc.paths.concat([innerFile]) })
        .then(() => console.log(innerFile))
        .catch((err: any) => console.log("err in FilesDB.put to update:", err));
    })
    .catch(() => {
      FilesDB.put({ id: hash, paths: [innerFile] })
        .then(() => console.log(innerFile))
        .catch((err: any) => console.log("err in FilesDB.put to insert", err));
    });
}

function saveFolderToDB(
  arg: FolderDBModel,
  pathFromState: PathModel,
  cb: Function
) {
  console.log("saveFolderToDB..........");
  FoldersDB.get(arg.path)
    .then(() => {
      console.log("folder already inserted ");
      console.log("folder already inserted ");
      console.log("folder already inserted ");
      console.log("folder already inserted ");
      console.log("folder already inserted ");
      console.log("folder already inserted ");
    })
    .catch((err: any) => {
      console.log("dir NOT  NOT NOT found, insert it ", arg.path);
      FoldersDB.put({
        _id: `${pathFromState.id}`,
        path: arg["path"],
        status: arg["status"],
      })
        .then((res: any) => {
          console.log("res in FoldersDB.put to insert", res, arg.path);
          cb();
        })
        .catch((err: any) =>
          console.log("err in FoldersDB.put to insert", err, arg.path)
        );
    });
}

async function getScanStatus(state: RootState | undefined) {
  console.log("getScanStatus ************");
  FoldersDB.allDocs({
    include_docs: true,
    attachments: true,
  })
    .then((res: any) => console.log("res in FoldersDB.allDocs", res))
    .catch((err: any) => console.log("err in FoldersDB.allDocs", err));

  if (state) {
    let foldersCount = state.paths.length;
    let doneCount = 0;
    for (var pathMod of state.paths) {
      let result = await FoldersDB.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.path == pathMod.path) doneCount++;
      console.log("inside for each");
    }
    console.log("after for each");
    return doneCount / foldersCount;
  }
  return 0;
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
          getScanStatus(state)
            .then(res => {
              if (res == 1) {
                actions.toggleScanOnGoing(state);
              } else {
                let newState = { ...state, scanOnGoing: res != 1, res: res };
                actions.changeScanProgress(newState);
              }
            })
            .catch(err => {
              actions.toggleScanOnGoing(state);
            });
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

  componentDidMount() {
    if (this.props.fullState.process.scanOnGoing) {
      this.props.actions.ScanStatus(this.props.fullState);
    }
  }

  startScan() {
    console.log("start scan !!!!!!!!!!!!!!!!!");
    this.props.actions.toggleScanOnGoing(this.props.fullState);
  }

  render() {
    console.log("...........................................");
    console.log(this.props.fullState.process.progress);
    console.log("...........................................");
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
          <div
            className="determinate"
            style={{ width: `${this.props.fullState.process.progress * 100}%` }}
          />
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
