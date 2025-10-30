import { Lightning } from "@lightningjs/sdk";
import HorizontalContainer from "./containers/HorizontalContainer";
import Card from "./Card";

export default class MovieRow extends Lightning.Component {
  static _template() {
    return {
      Row: {
        w: 1241,
        h: 359,
        type: HorizontalContainer,
      },
    };
  }

  get _Row() {
    return this.tag("Row");
  }

  set props({ items, raillabel }) {
    const cards = items.map((data) => ({
      type: Card,
      props: {
        image: data.image,
        label: data.label,
      },
    }));

    this.patch({
      Row: {
        props: {
          items: cards,
          railTitle: raillabel,
          disableScroll: false,
        },
      },
    });
  }

  _getFocused() {
    return this._Row._getFocused();
  }

  _handleLeft() {
    return this._Row._handleLeft();
  }

  _handleRight() {
    return this._Row._handleRight();
  }
}
