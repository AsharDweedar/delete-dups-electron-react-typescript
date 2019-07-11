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
  db.allDocs().then(function(result: any) {
    let docs = result.rows.map((row: any) => ({
      _id: row["_id"],
      _rev: row["value"]["_rev"],
      _deleted: true,
    }));
    db.bulkDocs(docs, function(err: any, response: any) {
      if (err) {
        return console.log("ERROR: deleting all documents", err);
      } else {
        console.log(response, "Documents deleted Successfully");
      }
    });
  });
}
resetDB(FoldersDB);
resetDB(FilesDB);

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
      download: Function;
    } & PathActions;
  } // TODO: do i need to send PathActions?
}

function toggleFolderDone(
  { path }: { path: string },
  state: RootState | undefined,
  actions: AllActions
) {
  if (state) {
    let exists = state.paths.filter((ele: PathModel) => ele.path == path);

    if (exists[0]) {
      actions.completeAll(exists[0]);
    }
  }
}

function Scanner(state: RootState | undefined, actions: AllActions) {
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
    let paths = state.paths.filter((ele: PathModel) => !ele.scan_completed);
    ipcRenderer.send("request-scan-action", paths);
  }
}

function saveFileToDB(arg: FileMsgModel, retries: number) {
  var { hash, path } = arg;
  var obj = { path: path, hash: hash, _id: `${Math.random() * 100}` };
  FilesDB.put(obj)
    .then(() => {})
    .catch((err: any) => {
      console.log("err with saving file : ", err);
      if (--retries) saveFileToDB(arg, retries);
    });
}

async function download(cb: Function) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  if (document.getElementById("download_conclusion"))
    return alert("downloading already in progress; preparing Data!");

  var element = document.createElement("a");
  element.setAttribute("id", "download_conclusion");
  let files = await FilesDB.allDocs({ include_docs: true });
  console.log(files);
  let folders = await FoldersDB.allDocs({ include_docs: true });
  let data = JSON.stringify(files) + "\n\n\n\n" + JSON.stringify(folders);
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  element.setAttribute("download", "conclusion.txt");

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

  cb();
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
        download: download,
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
export class GetStarted extends React.Component<
  GetStarted.Props,
  { isDownloading: boolean }
> {
  constructor(props: GetStarted.Props, context?: any) {
    super(props, context);
    this.state = { isDownloading: false };
    this.startScan = this.startScan.bind(this);
    this.startDownload = this.startDownload.bind(this);
    this.toggleScanOnGoing = this.toggleScanOnGoing.bind(this);
  }

  toggleScanOnGoing() {
    this.props.actions.toggleScanOnGoing(this.props.fullState);
  }

  startScan() {
    if (!this.props.fullState.process.scanOnGoing) this.toggleScanOnGoing();
    this.props.actions.startScan(this.props.fullState);
  }

  startDownload() {
    if (!this.state.isDownloading) this.setState({ isDownloading: true });
    this.props.actions.download(() => {
      this.setState({ isDownloading: false });
    });
  }

  render() {
    let state = this.props.fullState;
    let { paths } = state;
    let donePaths = paths.filter((e: PathModel) => e.scan_completed).length;

    let percent = (donePaths / paths.length) * 100;
    let scanning = state.process.scanOnGoing;
    let isDisabled =
      scanning || donePaths == paths.length || paths[0].id == -1
        ? "disabled"
        : "";
    let isDownloading =
      this.state.isDownloading || donePaths == 0 ? "disabled" : "";
    return (
      <div>
        <div className={style.container1}>
          <Options scanning={scanning} />
        </div>
        <div>
          <a
            onClick={this.startScan}
            className={`waves-effect waves-light btn-large right ${isDisabled}`}
            style={{ margin: "2.5em" }}
          >
            <i className="material-icons left">cloud</i>
            Start Scanning
          </a>

          <a
            onClick={this.startDownload}
            className={`waves-effect waves-light btn-large right ${isDownloading}`}
            style={{ margin: "2.5em" }}
          >
            <i className="material-icons left">cloud_download</i>
            download
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
            scanning={scanning}
            toggleScanOnGoing={this.toggleScanOnGoing}
          />
          <InputListExts />
        </div>
      </div>
    );
  }
}
