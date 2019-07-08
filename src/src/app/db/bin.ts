import PouchDB from "pouchdb-browser";

const FilesDB = new PouchDB("filesDB");
const FoldersDB = new PouchDB("foldersDB");

export default {
  FilesDB: FilesDB,
  FoldersDB: FoldersDB,
};
