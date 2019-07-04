import PouchDB from "pouchdb-browser";

const FilesDB = new PouchDB("filesDB");
const FoldersDB = new PouchDB("foldersDB");

const DB = {
  FilesDB: FilesDB,
  FoldersDB: FoldersDB,
};

export default DB;
