import * as fs from "fs";
import * as path from "path";
import { sha256 } from "js-sha256";
import { ExtModel } from "../src/src/app/models";
export default async function scanFolder(
  event: any,
  exts: ExtModel[],
  folder: string,
  recourse: boolean
) {
  var files = fs.readdirSync(folder);
  console.log(" scanFolder : ", folder);
  // remove hidden folders
  files = files.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));
  var doneWithCount = 0;
  for (var i = 0; i < files.length; i++) {
    var innerFile = path.join(folder, files[i]);
    if (fs.lstatSync(innerFile).isDirectory()) {
      if (recourse) {
        // console.log("before await ........................ : ", innerFile);
        await scanFolder(event, exts, innerFile, recourse);
        // console.log("after await ........................ : ", innerFile);
        //   console.log(
        //     "done from sub folder and now send notification for folder"
        //   );
        //   event.sender.send("scan-response", {
        //     path: innerFile,
        //     type: "folder",
        //     folder: folder,
        //     doneWithCount: ++doneWithCount,
        //     lsLength: files.length,
        //   });
        // } else {
        //   event.sender.send("scan-response", {
        //     path: innerFile,
        //     type: "folder",
        //     folder: folder,
        //     doneWithCount: ++doneWithCount,
        //     lsLength: files.length,
        //   });
      }
    } else {
      let ext = path.extname(innerFile);
      if (allowedExt(ext, exts)) {
        let hash = hashFile(innerFile);
        event.sender.send("scan-response", {
          path: innerFile,
          hash: hash,
          type: "file",
          folder: folder,
          doneWithCount: ++doneWithCount,
          lsLength: files.length,
        });
      } else {
        console.log("ignore invalid ext: ");
      }
    }
  }
  // console.log("go to sleep ");
  await sleep(5000);
  // console.log("wake up");
  // console.log("sending Done response for folder ", folder);
  event.sender.send("scan-response", {
    path: folder,
    type: "folder",
    folder: folder,
    doneWithCount: ++doneWithCount,
    lsLength: files.length,
  });
}

function allowedExt(extToFind: string, exts: ExtModel[]) {
  for (let { ext, sensitive } of exts) {
    if (extToFind == ext) return true;
    if (!sensitive && extToFind == ext.toLowerCase()) return true;
  }
  return false;
}

function hashFile(path: string) {
  let content = fs.readFileSync(path, "utf8");
  let newHash = sha256(content);
  // console.log(newHash);
  return typeof newHash == "string" ? newHash : `${Math.random()}`;
}

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
