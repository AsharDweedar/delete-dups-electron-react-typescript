// import { PouchDB } from "pouchdb-browser";

import { ipcRenderer } from "electron";

// import { PathModel } from "app/models";
import { RootState } from "app/reducers";

// var db = new PouchDB("my_database");
ipcRenderer.on("scan-response", (event: any, arg: any) => {
  console.log("arg: should be hello world", arg); // prints "Hello World!"
});

export default function Scanner(state: RootState | undefined) {
  if (state) ipcRenderer.send("request-scan-action", state.paths);
}
