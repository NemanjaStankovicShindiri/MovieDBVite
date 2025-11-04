import { Lightning, Router } from "@lightningjs/sdk";
import HorizontalContainer from "../containers/HorizontalContainer";
import Card from "./Card";

export default class MovieRow extends Lightning.Component {
  _railLabel = null;
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
    this._railLabel = raillabel;
    const cards = items.map((item) => ({
      type: Card,
      props: {
        image: `${import.meta.env.VITE_POSTER_URL}${item.poster_path}`,
        label: item.title,
        id: item.id,
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

  $navigateToDetailsPage(id) {
    Router.navigate(this._railLabel.toLowerCase() + "/" + id);
  }
}
