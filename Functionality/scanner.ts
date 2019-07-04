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

  for (let name of files) {
    var innerFile = path.join(folder, name);
    if (fs.lstatSync(innerFile).isDirectory()) {
      if (recourse) {
        await scanFolder(event, innerFile, recourse);
      } else {
        event.sender.send("scan-response", {
          path: innerFile,
          status: "skip",
          message: "Not a File and Recursively is disabled",
          type: "folder",
        });
      }
    } else {
      // TODO: check extension
      // hash content
      let hash = hashFile(innerFile);
      // save to db
      event.sender.send("scan-response", {
        path: innerFile,
        status: "success",
        message: "completed file check",
        hash: hash,
        type: "file",
      });
    }
  }
  event.sender.send("scan-response", {
    path: folder,
    status: "success",
    message: `completed one: ${folder}`,
    type: "folder",
  });
}

function hashFile(path: string) {
  var content = fs.readFileSync(path, "utf8");
  var hash = sha256.create();
  content.split("\n").forEach(line => {
    hash.update(line);
  });
  // console.log("hash hex", hash);
  // hash.hex();
  // console.log("hash array", hash);
  // hash.array();
  return `${Math.random()}`;
}
