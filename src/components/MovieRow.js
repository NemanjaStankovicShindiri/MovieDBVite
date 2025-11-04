import { Lightning } from "@lightningjs/sdk";
import HorizontalContainer from "../containers/HorizontalContainer";
import Card from "./Card";

export default class MovieRow extends Lightning.Component {
  static _template() {
    return {
      Row: {
        w: 1900,
        h: 359,
        rect: true,
        type: HorizontalContainer,
        collision: true,
      },
    };
  }

  get _Row() {
    return this.tag("Row");
  }

  set props(props) {
    const { items, raillabel } = props;
    console.log(props);
    const cards = items.map((item) => ({
      type: Card,
      props: {
        image: `${import.meta.env.VITE_POSTER_URL}${item.poster_path}`,
        label: item.title,
      },
    }));

    this.patch({
      Row: {
        props: {
          items: cards,
          railTitle: raillabel,
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
