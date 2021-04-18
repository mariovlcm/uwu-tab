import { ColorUtil } from "../../colorUtil";
import Component from "../../interfaces/Component";
import { AddCard } from "./AddCard";

export class AddModal extends Component {
  invokBtn: HTMLButtonElement;
  modal: AddCard;
  static get observedAttributes() {
    return ["newpage"];
  }
  constructor() {
    super();
    this.invokBtn = document.createElement("button");
    this.invokBtn.addEventListener("click", () => this.clickEvent(this.modal));
    this.invokBtn.addEventListener(
      "mouseenter",
      async () => await this.hover(this.invokBtn)
    );
    this.invokBtn.addEventListener(
      "mouseleave",
      async () => await this.unhover(this.invokBtn)
    );
    this.modal = new AddCard();
  }
  connectedCallback() {
    this.append(this.invokBtn);
    this.invokBtn.className = "openModalBtn";
    this.invokBtn.innerText = "AÑADIR";
    this.invokBtn.style.backgroundColor = "rgb(255,255,255)";
  }
  attributeChangedCallback(
    name: string,
    lastValue: string,
    newValue: string
  ): void {
    if (name == "newpage")
      this.parentElement?.setAttribute("newpage", newValue);
  }
  clickEvent(modal: AddCard) {
    this.append(modal);
  }
  async hover(btn: HTMLButtonElement) {
    const c: number[] = await ColorUtil.strRgbToNumArray(
      btn.style.backgroundColor
    );
    btn.style.backgroundColor = `rgb(${c[0] - 10 < 0 ? 0 : c[0] - 10},${
      c[1] - 10 < 0 ? 0 : c[1] - 10
    },${c[2] - 10 < 0 ? 0 : c[2] - 10} )`;
  }
  async unhover(btn: HTMLButtonElement) {
    const c: number[] = await ColorUtil.strRgbToNumArray(
      btn.style.backgroundColor
    );
    btn.style.backgroundColor = `rgb(${c[0] + 10 > 255 ? 255 : c[0] + 10},${
      c[1] + 10 > 255 ? 255 : c[1] + 10
    },${c[2] + 10 > 255 ? 255 : c[2] + 10} )`;
  }
}

window.customElements.define("nt-addpagemodal", AddModal);
