import { Lightning, Router } from "@lightningjs/sdk";
import HorizontalContainer from "./HorizontalContainer";
import Card from "./Card";

export default class MovieRow extends Lightning.Component {
  _railLabel = null;
  static _template() {
    return {
      Row: {
        w: 1900,
        h: 404,
        rect: true,
        type: HorizontalContainer,
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
        image: `${"https://image.tmdb.org/t/p/w300"}${item.poster_path}`,
        label: item.title,
        id: item.id,
        type: raillabel.toLowerCase(),
        overview: item.overview,
      },
    }));

    this.patch({
      Row: {
        props: {
          disableScroll: true,
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
