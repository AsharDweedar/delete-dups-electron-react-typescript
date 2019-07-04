import { handleActions } from "redux-actions";
import { ipcRenderer } from "electron";

import { RootState } from "./state";
import { ProcessActions } from "../actions";
import { PathModel } from "../models";

import DB from "../../db/bin";

const FilesDB = DB.FilesDB;
const FoldersDB = DB.FoldersDB;

interface FileDBModel {
  paths: string[];
  id: string;
}

const initialState: RootState.ProcessState = {
  scanOnGoing: false,
  progress: 0,
};

function Scanner(state: RootState | undefined) {
  console.log("Scanner **********");
  if (state) {
    ipcRenderer.on("scan-response", (event: any, arg: any) => {
      switch (arg["type"]) {
        case "file":
          console.log("notified file 11111111", arg.path);
          saveToDB(arg["hash"], arg["path"]);
          break;

        case "folder":
          console.log("notified folder 22222222222", arg.path);
          let fromState = state.paths.filter(ele => ele.path == arg.path);
          if (fromState.length) {
            FoldersDB.put({
              _id: fromState[0].id,
              path: arg["path"],
              status: arg["status"],
            })
              .then((res: any) => console.log("res in FoldersDB.put", res))
              .catch((err: any) => console.log("err in FoldersDB.put", err));
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

function saveToDB(hash: string, innerFile: string) {
  console.log("saveToDB..........");
  FilesDB.get(hash)
    .then((doc: FileDBModel) => {
      console.log("file hash already found, update it ");
      FilesDB.update({ ...doc, path: doc.paths.concat([innerFile]) })
        .then((res: any) => console.log("res in FilesDB.update", res))
        .catch((err: any) => console.log("err in FilesDB.update", err));
    })
    .catch((err: any) => {
      console.log("file hash NOT  NOT NOT found, insert it ", err);
      FilesDB.put({ _id: hash, paths: [innerFile] })
        .then((res: any) => console.log("res in FilesDB.put", res))
        .catch((err: any) => console.log("err in FilesDB.put", err));
    });
}

function getScanStatus(state: RootState | undefined) {
  if (state) {
    let foldersCount = state.paths.length;
    let doneCount = 0;
    state.paths.forEach(async function(pathMod: PathModel) {
      let result = await FoldersDB.allDocs({
        include_docs: true,
        attachments: true,
      });
      if (result.path == pathMod.path) doneCount++;
      console.log("inside  for each");
    });
    console.log("after for each");
    return doneCount / foldersCount;
  }
  return 0;
}

export const processReducer = handleActions<RootState.ProcessState, RootState>(
  {
    [ProcessActions.Type.SCANNING_START]: (state, action) => {
      Scanner(action["payload"]);

      return {
        ...state,
        scanOnGoing: !state["scanOnGoing"],
      };
    },
    [ProcessActions.Type.SCANNING_STATUS]: (state, action) => {
      let progress = getScanStatus(action["payload"]);

      return {
        ...state,
        scanOnGoing: progress != 1,
        progress: progress,
      };
    },
  },
  initialState
);
