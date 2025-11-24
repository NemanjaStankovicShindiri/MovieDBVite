import { Router } from '@lightningjs/sdk';
import Lightning from '@lightningjs/sdk/src/Lightning';
export default class LivePlayerButton extends Lightning.Component {
  static _template() {
    return {
      w: 352,
      h: 67,
      x: 64,
      y: 971,
      rect: true,
      color: 0xff2f2f2f,
      shader: {
        type: Lightning.shaders.RoundedRectangle,
        radius: 30,
        stroke: 0,
      },
      flex: {
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      flexItem: {
        paddingLeft: 24,
        paddingTop: 22.5,
        paddingRight: 24,
        paddingButton: 22.5,
        marginTop: 12,
      },
      Label: {
        text: {
          text: 'GO TO LIVE PLAYER',
          textColor: 0xffffffff,
          fontSize: 24,
          fontFace: 'InterSemiBold',
          letterSpacing: 6,
        },
      },
    };
  }
  _focus() {
    this.patch({
      color: 0xffed1c24,
    });
  }

  _unfocus() {
    this.patch({
      color: 0xff2f2f2f,
    });
  }

  _handleEnter() {
    Router.navigate('InputPage');
  }
}
