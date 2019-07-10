import { PathModel } from "./src/src/app/models";

import scanFolder from "./Functionality/scanner";

function eventListeners(ipcMain: any) {
  ipcMain.on("request-scan-action", (event: any, arg: PathModel[]) => {
    console.log("arg inside listener", arg);
    arg.forEach(function(pathMod: PathModel) {
      // console.log("..................before scanFolder", pathMod.path);
      scanFolder(event, pathMod.path, pathMod.recursively);
      // console.log("..................after scanFolder", pathMod.path);
    });
  });
}

export default eventListeners;
