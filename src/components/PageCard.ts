import Component from "../interfaces/Component";
import "../styles/favCard.scss";
import { ColorUtil } from "../colorUtil";
import { PageContextMenu } from "./PageContextMenu";
import { IFavPage } from "../database";
import { db } from "..";

export class PageCard extends Component {
  draggable = true;
  page: IFavPage;
  ctxMenu: PageContextMenu | null = null;
  static get observedAttributes() {
    return ["remove"];
  }
  constructor(page: IFavPage) {
    super();
    this.page = page;
    this.onclick = this.clickEvent;
    this.ondragstart = this.dragStart;
    this.ondrop = this.drop;
    this.ondragover = this.dragOver;
    this.addEventListener("mouseenter", async () => await this.hover());
    this.addEventListener("mouseleave", async () => await this.unhover());
    this.addEventListener(
      "contextmenu",
      async (e) => await this.contextMenu(e)
    );
  }
  connectedCallback() {
    this.style.backgroundColor = this.page.color || "rgb(255,255,255)";
    this.innerText = this.page.title;
  }
  attributeChangedCallback(name: string) {
    if (name == "remove") this.remove();
  }
  async clickEvent() {
    if (!(await this.ctxMenuShown())) window.location.href = this.page.url;
  }
  async hover() {
    const c: number[] = await ColorUtil.strRgbToNumArray(
      this.style.backgroundColor
    );
    this.style.backgroundColor = `rgb(${c[0] - 10 < 0 ? 0 : c[0] - 10},${
      c[1] - 10 < 0 ? 0 : c[1] - 10
    },${c[2] - 10 < 0 ? 0 : c[2] - 10} )`;
  }
  async unhover() {
    const c: number[] = await ColorUtil.strRgbToNumArray(
      this.style.backgroundColor
    );
    this.style.backgroundColor = `rgb(${c[0] + 10 > 255 ? 255 : c[0] + 10},${
      c[1] + 10 > 255 ? 255 : c[1] + 10
    },${c[2] + 10 > 255 ? 255 : c[2] + 10} )`;
  }
  async contextMenu(e: MouseEvent) {
    e.preventDefault();
    if (this.ctxMenu) {
      this.ctxMenu.remove();
      this.ctxMenu = null;
    } else {
      this.ctxMenu = new PageContextMenu(this.page.id || -1);
      this.append(this.ctxMenu);
    }
  }
  async ctxMenuShown(): Promise<boolean> {
    return this.querySelectorAll("nt-page-ctxmenu").length != 0;
  }
  dragOver(e: DragEvent) {
    e.preventDefault();
  }
  dragStart(e: DragEvent) {
    e.dataTransfer?.setData("application/json", JSON.stringify(this.page));
  }
  async drop(e: DragEvent) {
    e.stopPropagation();
    const draggedPage = JSON.parse(
      e.dataTransfer?.getData("application/json") || ""
    ) as IFavPage;
    let draggedCard: PageCard = new PageCard({
      title: "error",
      url: "error",
      color: "error",
    });
    this.parentElement?.querySelectorAll("nt-pgcard").forEach((_p) => {
      const p = _p as PageCard;
      if (p.page.title == draggedPage.title) {
        draggedCard = p;
      }
    });

    if (draggedCard.page.url == "error") return false;

    const thisid = this.page.id;
    this.page.id = draggedPage.id;
    console.log(this.page, draggedPage.id);
    await db.pages.put(this.page, draggedPage.id);
    draggedPage.id = thisid;
    await db.pages.put(draggedPage, thisid);

    console.log(this.page, draggedPage);

    const tempPage = this.page;
    this.page = draggedPage;
    draggedCard.page = tempPage;
    draggedCard.connectedCallback();
    console.log(this.page, draggedPage);

    this.connectedCallback();

    return false;
  }
}

window.customElements.define("nt-pgcard", PageCard);
