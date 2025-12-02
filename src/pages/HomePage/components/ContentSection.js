import Lightning from '@lightningjs/sdk/src/Lightning';
import MEDIA_TYPE from '../../../consts/mediaType';
import HorizontalContainer from '../../../components/HorizontalContainer';
import Card from '../../../components/Card';
export default class ContentSection extends Lightning.Component {
  static _template() {
    return {
      MoviesSection: {
        disableScroll: true,
        w: 1270,
        h: 404,
        type: HorizontalContainer,
      },
      SeriesSection: {
        disableScroll: true,
        y: 423,
        w: 1270,
        h: 404,
        type: HorizontalContainer,
      },
    };
  }

  get _MoviesSection() {
    return this.tag('MoviesSection');
  }

  get _SeriesSection() {
    return this.tag('SeriesSection');
  }

  set props(props) {
    const [movies, series] = props;
    const moviesCards = movies.map((item, index) => ({
      type: Card,
      props: {
        image: `${'https://image.tmdb.org/t/p/w300'}${item.poster_path}`,
        label: item.title,
        id: item.id,
        type: MEDIA_TYPE.MOVIES.toLowerCase(),
        overview: item.overview,
        index: index,
      },
    }));
    const seriesCards = series.map((item, index) => ({
      type: Card,
      props: {
        image: `${'https://image.tmdb.org/t/p/w300'}${item.poster_path}`,
        label: item.title,
        id: item.id,
        type: MEDIA_TYPE.SERIES.toLowerCase(),
        overview: item.overview,
        index: index,
      },
    }));
    this.patch({
      MoviesSection: {
        props: {
          items: moviesCards,
          railTitle: MEDIA_TYPE.MOVIES,
          parentState: this._MoviesSection,
        },
      },
      SeriesSection: {
        props: {
          items: seriesCards,
          railTitle: MEDIA_TYPE.SERIES,
          parentState: this._SeriesSection,
        },
      },
    });
    this._setState(this._getState());
  }

  $handleStateHover(ref) {
    const currentState = this._getState();
    if (ref != currentState) {
      if (currentState) this.tag(currentState)._unfocus();
      this._setState(ref);
    }
    this.fireAncestors('$handleStateHover', this.ref);
  }

  static _states() {
    return [
      class MoviesSection extends this {
        _getFocused() {
          return this._MoviesSection;
        }
        _handleDown() {
          this._setState('SeriesSection');
          return true;
        }
      },
      class SeriesSection extends this {
        _getFocused() {
          return this._SeriesSection;
        }
        _handleUp() {
          this._setState('MoviesSection');
        }
      },
    ];
  }
}
