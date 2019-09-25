import { app, BrowserWindow, Menu, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";

import { join } from "path";
import { homedir } from "os";
// import selectDirectory from "./Functionality/selectFolder";
import createMenu from "./menu";
import eventListeners from "./eventListeners";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;
const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: "react-hmr" });
}

const createWindow = async () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 600 });
  createMenu(Menu);
  mainWindow.loadURL(`file://${__dirname}/src/dist/index.html`);
  eventListeners(ipcMain, mainWindow);

  if (isDevMode) {
    try {
      await installExtension(REACT_DEVELOPER_TOOLS.id);
    } catch (error) {
      console.log("error with installExtention : ", error);
      try {
        let id = "ippapidnnboiophakmmhkdlchoccbgje";
        let subPath = `.config/google-chrome/Default/Extensions/${id}/1.6.0_0/`;
        let extPath = join(homedir(), subPath);
        BrowserWindow.addDevToolsExtension(extPath);
      } catch (error) {
        console.log("Error: BrowserWindow.addDevToolsExtension", error);
      }
    }
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
