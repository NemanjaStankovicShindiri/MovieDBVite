import Lightning from "@lightningjs/sdk/src/Lightning";
import { Utils } from "@lightningjs/sdk";
export default class Card extends Lightning.Component {
  static _template() {
    return {
      w: 229,
      h: 359,
      flexItem: { marginLeft: 12, marginRight: 12 },
      Image: {
        w: (w) => w,
        h: (h) => h - 59,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 6,
          stroke: 0,
        },
      },
      Label: {
        w: (w) => w,
        y: (h) => h - 59,
        h: 59,
        text: {
          textColor: 0x99ffffff,
          fontSize: 24,
          fontFace: "Inter",
        },
      },
    };
  }

  set props({ image, label }) {
    this.patch({ Image: { src: Utils.asset(image) }, Label: { text: label } });
  }

  _focus() {
    this.patch({
      smooth: { scale: 1.1 },
      Image: {
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 6,
          stroke: 6,
          strokeColor: 0xffed1c24,
        },
      },
      Label: {
        text: { textColor: 0xffffffff },
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: { scale: 1.0 },
      Image: {
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 6,
          stroke: 6,
        },
      },
      Label: {
        text: { textColor: 0x99ffffff },
      },
    });
  }
}
