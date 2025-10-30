import Lightning from "@lightningjs/sdk/src/Lightning";
import MovieRow from "./MovieRow";
const movies = [
  { label: "Dead of winter", image: "images/1.jpg" },
  { label: "Winter of dead", image: "images/2.jpg" },
  { label: "Dead winter off", image: "images/3.jpg" },
  { label: "Dead of dead", image: "images/2.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
];

export default class ContentSection extends Lightning.Component {
  static _template() {
    return {
      MoviesSection: {
        w: 1270,
        h: 404,
        type: MovieRow,
      },
      SeriesSection: {
        y: 423,
        w: 1270,
        h: 404,
        type: MovieRow,
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
          items: movies,
          raillabel: "MOVIES",
        },
      },
      SeriesSection: {
        props: {
          items: movies,
          raillabel: "SERIES",
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
