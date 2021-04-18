import { db } from "../..";
import Component from "../../interfaces/Component";

export class Notes extends Component {
  constructor() {
    super();
  }
  connectedCallback() {
    db.notes.each((i) => {});
  }
}
