import Dexie from "dexie";

export interface IFavPage {
  id?: number;
  title: string;
  url: string;
  color: string;
}

export interface INote {
  id?: number;
  content: string;
}

export class Database extends Dexie {
  pages: Dexie.Table<IFavPage, number>;
  notes: Dexie.Table<INote, number>;
  constructor() {
    super("Database");
    this.version(2).stores({
      pages: "++id,title, url, color",
      notes: "++id,content",
    });
    this.pages = this.table("pages");
    this.notes = this.table("notes");
  }
}
