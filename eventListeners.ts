import { PathModel } from "./src/src/app/models/PathModel";

function eventListeners(ipcMain: any) {
  console.log("ipcMain: **** build time i guess **", ipcMain);
  ipcMain.on("request-scan-action", (event: any, arg: PathModel[]) => {
    console.log("event ....................");
    console.log(event);
    console.log("arg .................... should be list of path model");
    console.log(arg);
    event.sender.send("scan-response", "Hello World!");
  });
}
export default eventListeners;
