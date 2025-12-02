import { Lightning, Utils, Router } from '@lightningjs/sdk';

export default class ChannelCard extends Lightning.Component {
  static _template() {
    return {
      collision: true,
      w: 280,
      h: 136,
      flexItem: {
        paddingLeft: 24,
        paddingTop: 22.5,
        paddingRight: 24,
        paddingButton: 22.5,
        marginTop: 12,
      },
      Border: {
        w: 280,
        h: 136,
        texture: Lightning.Tools.getRoundRect(280, 136, 16, 4, 0xff2a3638, true, 0xff2a3638),
        flex: {
          direction: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        Content: {
          zIndex: 3,
          Image: { w: 45, h: 45, mountX: 0.5, mountY: 0.8 },
          Label: {
            y: 45,
            mountX: 0.5,
            mountY: 0.8,
            text: {
              text: '',
              fontSize: 16,
              fontFace: 'InterRegular',
              textColor: 0xffffffff,
            },
          },
        },
      },
    };
  }
  get _Label() {
    return this.tag('Label');
  }
  set props({ image, label }) {
    this.patch({
      Border: {
        Content: {
          Image: { src: Utils.asset('images/' + image) },
          Label: {
            text: {
              text: label,
            },
          },
        },
      },
    });
  }

  _handleHover() {
    if (Router.isNavigating()) return;
    this._focus();
    this.fireAncestors('$handleItemHover', this.parent.children.indexOf(this));
  }

  _focus() {
    this.patch({
      Border: {
        texture: Lightning.Tools.getRoundRect(280, 136, 16, 4, 0xffff0000, true, 0xff2a3638),
      },
    });
  }

  _unfocus() {
    this.patch({
      Border: {
        texture: Lightning.Tools.getRoundRect(280, 136, 16, 4, 0xff2a3638, true, 0xff2a3638),
      },
    });
  }
}
