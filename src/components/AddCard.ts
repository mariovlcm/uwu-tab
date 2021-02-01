import { db } from "..";
import { IFavPage } from "../database";
import Component from "../interfaces/Component";
import "../styles/addCard.scss";

export class AddCard extends Component {
  titleDiv: HTMLDivElement;
  titleHead: HTMLSpanElement;
  closeBtn: HTMLButtonElement;
  inpTitle: HTMLInputElement;
  inpUrl: HTMLInputElement;
  inpColor: HTMLInputElement;
  btnSubmit: HTMLButtonElement;
  label: HTMLLabelElement;
  constructor() {
    super();
    this.titleDiv = document.createElement("div");
    this.titleHead = document.createElement("span");
    this.inpTitle = document.createElement("input");
    this.inpUrl = document.createElement("input");
    this.inpColor = document.createElement("input");
    this.btnSubmit = document.createElement("button");
    this.label = document.createElement("label");
    this.closeBtn = document.createElement("button");
    this.closeBtn.addEventListener("click", () => {
      this.remove();
    });
    this.btnSubmit.addEventListener("click", async () => {
      const page = await this.submit(this.inpTitle, this.inpUrl, this.inpColor);
      this.parentElement?.setAttribute("newpage", JSON.stringify(page));
      this.remove();
    });
  }

  connectedCallback() {
    this.inpTitle.className = "fav inp";
    this.inpUrl.className = "fav inp";
    this.inpColor.className = "fav inp";
    this.append(this.titleDiv);
    this.titleDiv.append(this.titleHead);
    this.titleDiv.append(this.closeBtn);
    this.titleHead.innerText = "Añadir";
    this.closeBtn.innerText = "X";
    this.closeBtn.className = "addfav close";
    this.append(this.inpTitle);
    this.append(this.inpUrl);
    this.append(this.inpColor);
    this.append(this.btnSubmit);
    this.inpColor.type = "text";
    this.inpUrl.type = "text";
    this.inpTitle.type = "text";
    this.btnSubmit.innerText = "AÑADIR";
    this.inpTitle.placeholder = "Título";
    this.inpUrl.placeholder = "Url";
    this.inpColor.placeholder = "Color HEX";
  }

  async submit(
    title: HTMLInputElement,
    url: HTMLInputElement,
    color: HTMLInputElement
  ): Promise<IFavPage> {
    const id = await db.pages.add({
      title: title.value,
      url: url.value,
      color: color.value,
    });
    return { id, title: title.value, url: url.value, color: color.value };
  }
}

window.customElements.define("nt-addfav", AddCard);
