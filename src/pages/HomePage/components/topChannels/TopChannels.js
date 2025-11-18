import VerticalContainer from '../../../../components/VerticalContainer';
import ChannelCard from './ChannelCard';
import Lightning from '@lightningjs/sdk/src/Lightning';

export default class TopChannels extends Lightning.Component {
  _cards = null;
  static _template() {
    return {
      Column: {
        flex: { alignItems: 'center', justifyContent: 'center' },
        color: 0xff000000,
        rect: true,
        w: 312,
        h: 837,
        texture: Lightning.Tools.getRoundRect(312, 837, 16, 0, 0xffffffff, true, 0xffffffff),
        type: VerticalContainer,
      },
    };
  }

  get _Column() {
    return this.tag('Column');
  }

  _getFocused() {
    return this._Column._getFocused();
  }

  _handleUp() {
    return this._Column._handleUp();
  }

  _handleDown() {
    return this._Column._handleDown();
  }

  set props(items) {
    this._cards = items.map((data) => ({
      type: ChannelCard,
      props: {
        image: data.image,
        label: data.name,
      },
    }));
    this.patch({
      Column: {
        props: {
          items: this._cards,
          title: 'Top 5 movies',
          w: this.w,
          h: this.h,
          titleFontSize: 24,
          titleFontFace: 'InterBold',
          titleColor: 0xffffffff,
          titleAlign: 'center',
        },
      },
    });
  }
}
