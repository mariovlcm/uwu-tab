import Component from "../interfaces/Component";
import { db } from "..";
import { PageCard } from "./PageCard";
import { AddModal } from "./AddModal";
import { IFavPage } from "../database";

export class Favorites extends Component {
  addModal: AddModal;
  constructor() {
    super();
    this.addModal = new AddModal();
  }
  static get observedAttributes() {
    return ["newpage"];
  }
  connectedCallback() {
    db.pages.each((p) => {
      this.append(new PageCard(p));
    });
    this.append(this.addModal);
  }
  attributeChangedCallback(name: string, lastValue: string, newValue: string) {
    if (name == "newpage") {
      try {
        this.append(new PageCard(JSON.parse(newValue) as IFavPage));
      } catch (e: unknown) {
        alert(
          "No se pudo añadir correctamente la página. Recarga y prueba otra vez. Error: " +
            e
        );
      }
    }
  }
}

window.customElements.define("nt-favs", Favorites);
