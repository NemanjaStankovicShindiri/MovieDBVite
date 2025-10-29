import { Lightning } from "@lightningjs/sdk";
import HorizontalContainer from "../src/containers/HorizontalContainer";
import Card from "../src/Card";

export default class MovieRow extends Lightning.Component {
  _items = [];
  _title = "";
  static _template() {
    return {
      Row: {
        w: 1241,
        h: 359,
        color: 0xffff0000,
        type: HorizontalContainer,
        clipping: true,
        collision: true,
      },
    };
  }
  _init() {
    const cards = this._items.map((data) => ({
      type: Card,
      props: {
        image: data.image,
        label: data.label,
      },
    }));
    this.patch({
      Row: {
        props: { items: cards, railTitle: this._title, w: this.w, h: this.h },
      },
    });
  }
  get _Row() {
    return this.tag("Row");
  }
  set props({ items, raillabel }) {
    (this._items = items), (this._title = raillabel);
  }

  _getFocused() {
    return this._Row._getFocused();
  }
}
