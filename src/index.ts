import "./styles/index.scss";
import Component from "./interfaces/Component";
import { Database } from "./database";
import { Favorites } from "./components/Favorites";
import { AddCard } from "./components/AddCard";
import { AddModal } from "./components/AddModal";

export const db = new Database();

class Main extends Component {
  favs: Favorites;
  constructor() {
    super();
    this.favs = new Favorites();
  }
  connectedCallback() {
    this.appendChild(this.favs);
  }
}

window.customElements.define("nt-main", Main);
