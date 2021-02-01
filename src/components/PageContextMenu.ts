import { db } from "..";
import Component from "../interfaces/Component";
import "../styles/pageCtxMenu.scss";

export class PageContextMenu extends Component {
  deleteBtn: HTMLButtonElement;
  constructor(pageId: number) {
    super();
    this.deleteBtn = document.createElement("button");
    this.deleteBtn.disabled = pageId == -1;
    this.deleteBtn.addEventListener("click", async () =>
      this.deleteEvent(pageId)
    );
  }
  connectedCallback() {
    this.append(this.deleteBtn);
    this.deleteBtn.innerText = "Borrar";
  }
  async deleteEvent(id: number) {
    this.parentElement?.setAttribute("remove", " ");
    await db.pages.delete(id);
  }
}

window.customElements.define("nt-page-ctxmenu", PageContextMenu);
