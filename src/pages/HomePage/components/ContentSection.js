import Lightning from "@lightningjs/sdk/src/Lightning";
import MovieRow from "../../../components/MovieRow";
import MEDIA_TYPE from "../../../consts/mediaType";

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

  set props(props) {
    const [movies, series] = props;
    this.patch({
      MoviesSection: {
        props: { items: movies, raillabel: MEDIA_TYPE.MOVIES },
      },
      SeriesSection: {
        props: { items: series, raillabel: MEDIA_TYPE.SERIES },
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
