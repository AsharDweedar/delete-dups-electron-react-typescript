import * as fs from "fs";
import * as path from "path";
import { sha256 } from "js-sha256";

export default async function scanFolder(
  event: any,
  folder: string,
  recourse: boolean
) {
  var files = fs.readdirSync(folder);
  // remove hidden folders
  files = files.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));
  var doneWithCount = 0;
  files.forEach(async function(name: string, _i: number) {
    var innerFile = path.join(folder, name);
    if (fs.lstatSync(innerFile).isDirectory()) {
      if (recourse) {
        await scanFolder(event, innerFile, recourse);
      } else {
        event.sender.send("scan-response", {
          path: innerFile,
          type: "folder",
          folder: folder,
          doneWithCount: ++doneWithCount,
          lsLength: files.length,
        });
      }
    } else {
      // TODO: check extension
      // hash content
      let hash = hashFile(innerFile);
      // save to db
      event.sender.send("scan-response", {
        path: innerFile,
        hash: hash,
        type: "file",
        folder: folder,
        doneWithCount: ++doneWithCount,
        lsLength: files.length,
      });
    }
  });
}

function hashFile(path: string) {
  let content = fs.readFileSync(path, "utf8");
  let newHash = sha256(content);
  return typeof newHash == "string" ? newHash : `${Math.random()}`;
}
