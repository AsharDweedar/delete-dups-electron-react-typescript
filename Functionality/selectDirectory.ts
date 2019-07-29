const electron = require("electron");
const dialog = electron.dialog;
export default function selectDirectory(mainWindow: any, cb: Function) {
  dialog.showOpenDialog(
    mainWindow,
    {
      properties: ["openDirectory", "multiSelections"],
    },
    (dir: string[]) => {
      cb(dir);
    }
  );
}
