import { Lightning, Utils, Router } from "@lightningjs/sdk";

export default class extends Lightning.Component {
  static _template() {
    return {
      w: 112,
      h: 65,
      texture: lng.Tools.getRoundRect(
        112,
        65,
        35,
        0,
        0x00000000,
        true,
        0xff2f2f2f
      ),
      Image: {
        x: 56,
        y: 32,
        w: 48,
        h: 48,
        mountY: 0.5,
        mountX: 0.35,
        src: Utils.asset("images/arrow_back.png"),
      },
      flexItem: { marginBottom: 44 },
    };
  }

  _focus() {
    this.patch({
      texture: Lightning.Tools.getRoundRect(
        112,
        65,
        35,
        0,
        0x00000000,
        true,
        0xffed1c24
      ),
    });
  }

  _handleEnter() {
    Router.back();
  }

  _unfocus() {
    this.patch({
      texture: Lightning.Tools.getRoundRect(
        112,
        65,
        35,
        0,
        0x00000000,
        true,
        0xff2f2f2f
      ),
    });
  }
}
