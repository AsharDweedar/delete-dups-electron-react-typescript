import { dialog } from "electron";
import { PathModel, ExtModel } from "./src/src/app/models";

import scanFolder from "./Functionality/scanner";
import selectDirectory from "./Functionality/selectDirectory";

interface ScanArg {
  paths: PathModel[];
  exts: ExtModel[];
}

function eventListeners(ipcMain: any, mainWindow: any) {
  ipcMain.on("request-scan-action", (event: any, arg: ScanArg) => {
    console.log("arg inside listener", arg);
    arg.paths.forEach(function(pathMod: PathModel) {
      scanFolder(event, arg.exts, pathMod.path, pathMod.recursively);
    });
  });
  ipcMain.on("selectDirectory", function(event: any) {
    selectDirectory(mainWindow, (d: string[]) =>
      event.sender.send("selectDirectory", d)
    );
  });
}

export default eventListeners;
