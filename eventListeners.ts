import { PathModel } from "./src/src/app/models";

import scanFolder from "./Functionality/scanner";

function eventListeners(ipcMain: any) {
  ipcMain.on("request-scan-action", (event: any, arg: PathModel[]) => {
    arg.map(function(pathMod: PathModel) {
      scanFolder(event, pathMod.path, pathMod.recursively);
    });
  });
}

export default eventListeners;
