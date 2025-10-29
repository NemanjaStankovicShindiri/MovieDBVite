import Lightning from "@lightningjs/sdk/src/Lightning";
import HorizontalContainer from "./containers/HorizontalContainer";
import Card from "./Card";
const movies = [
  { label: "Dead of winter", image: "images/1.jpg" },
  { label: "Winter of dead", image: "images/2.jpg" },
  { label: "Dead winter off", image: "images/3.jpg" },
  { label: "Dead of dead", image: "images/2.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
];

export default class ContentSection extends Lightning.Component {
  static _template() {
    return {
      MoviesSection: {
        w: 1241,
        h: 360,
        type: HorizontalContainer,
      },
      SeriesSection: {
        y: 423,
        w: 1241,
        h: 404,
        type: HorizontalContainer,
      },
    };
  }

  get _MoviesSection() {
    return this.tag("MoviesSection");
  }

  get _SeriesSection() {
    return this.tag("SeriesSection");
  }

  _init() {
    this.patch({
      MoviesSection: {
        props: {
          items: movies.map((item) => ({
            w: 241,
            h: 359,
            type: Card,
            props: item,
          })),
          railTitle: "movies",
        },
      },
      SeriesSection: {
        props: {
          items: movies.map((item) => ({
            w: 241,
            h: 359,
            type: Card,
            props: item,
          })),
          railTitle: "series",
        },
      },
    });
    this._setState("MoviesSection");
  }

  static _states() {
    return [
      class MoviesSection extends this {
        _getFocused() {
          return this._MoviesSection;
        }
        _handleDown() {
          this._setState("SeriesSection");
          return true;
        }
      },
      class SeriesSection extends this {
        _getFocused() {
          return this._SeriesSection;
        }
        _handleUp() {
          this._setState("MoviesSection");
        }
      },
    ];
  }
}
