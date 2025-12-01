import { Lightning } from '@lightningjs/sdk';
import HorizontalContainer from '../../../components/HorizontalContainer';
import Card from '../../../components/Card';

export default class MovieRow extends Lightning.Component {
  _railLabel = null;
  static _template() {
    return {
      Row: {
        collision: true,
        w: 1241,
        h: 404,
        type: HorizontalContainer,
        disableScroll: true,
      },
    };
  }

  get _Row() {
    return this.tag('Row');
  }

  set props(props) {
    const { items, raillabel } = props;
    this._railLabel = raillabel;
    const cards = items.map((item, index) => ({
      type: Card,
      props: {
        image: `${'https://image.tmdb.org/t/p/w300'}${item.poster_path}`,
        label: item.title,
        id: item.id,
        type: raillabel.toLowerCase(),
        overview: item.overview,
        index: index,
      },
    }));

    this.patch({
      Row: {
        props: {
          items: cards,
          railTitle: raillabel,
          disableScroll: true,
          parentState: props.parentState,
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
