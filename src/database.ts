import Dexie from "dexie";

export interface IFavPage {
  id?: number;
  title: string;
  url: string;
  color: string;
}

export class Database extends Dexie {
  pages: Dexie.Table<IFavPage, number>;
  constructor() {
    super("Database");
    this.version(1).stores({
      pages: "++id,title, url, color",
    });
    this.pages = this.table("pages");
  }
}
