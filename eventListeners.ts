import { PathModel, ExtModel } from "./src/src/app/models";

import scanFolder from "./Functionality/scanner";

function eventListeners(ipcMain: any) {
  ipcMain.on("request-scan-action", (event: any, arg: { paths: PathModel[], exts: ExtModel[]}) => {
    console.log("arg inside listener", arg);
    arg.paths.forEach(function(pathMod: PathModel) {
      scanFolder(event, arg.exts, pathMod.path, pathMod.recursively);
    });
  });
}

export default eventListeners;
