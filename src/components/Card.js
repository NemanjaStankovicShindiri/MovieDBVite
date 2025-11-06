import { Lightning, Utils } from "@lightningjs/sdk";
export default class Card extends Lightning.Component {
  _id = null;
  static _template() {
    return {
      w: 229,
      h: 359,
      flexItem: { marginLeft: 12, marginRight: 12 },
      Placeholder: {
        w: (w) => w,
        h: (h) => h - 59,
        rect: true,
        src: Utils.asset("images/imgPlaceholder.jpg"),
        alpha: 1,
      },

      Image: {
        w: (w) => w,
        h: (h) => h - 59,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 6,
          stroke: 0,
        },
        alpha: 0.01,
      },
      Label: {
        w: (w) => w,
        y: (h) => h - 59,
        h: 59,
        text: {
          textColor: 0x99ffffff,
          fontSize: 24,
          wordWrap: false,
          fontFace: "InterRegular",
          maxLines: 1,
          textOverflow: "ellipsis",
          maxLinesSuffix: "...",
        },
      },
    };
  }

  get _Image() {
    return this.tag("Image");
  }

  get _Placeholder() {
    return this.tag("Placeholder");
  }
  set props({ image, label, id }) {
    this._id = id;
    this.patch({ Image: { src: image }, Label: { text: label } });
  }

  _handleEnter() {
    this.fireAncestors("$navigateToDetailsPage", this._id);
  }

  _init() {
    this._Image.on("txLoaded", this.onLoaded);
    this._Image.on("txError", this.onError);
  }

  onLoaded = () => {
    this._Image.off("txLoaded", this.onLoaded);
    this.patch({
      Placeholder: { smooth: { alpha: [0, { duration: 0.3, delay: 0.1 }] } },
      Image: { smooth: { alpha: [1, { duration: 0.3 }] } },
    });
  };

  onError = () => {
    this._Image.off("txError", this.onError);
    this.patch({
      Placeholder: { smooth: { alpha: [1, { duration: 0.3, delay: 0.1 }] } },
      Image: { smooth: { alpha: [0, { duration: 0.3 }] } },
    });
  };

  _focus() {
    this.patch({
      smooth: { scale: 1.1 },
      Image: {
        zIndex: 2,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 6,
          stroke: 6,
          strokeColor: 0xffed1c24,
        },
      },
      ShadowLeft: {
        x: -100,
        y: -55,
        color: 0x66151515,
        texture: lng.Tools.getShadowRect(229, 300, 0, 30, 60),
        zIndex: 1,
      },
      ShadowRight: {
        x: -30,
        y: -55,
        color: 0x66151515,
        texture: lng.Tools.getShadowRect(229, 300, 0, 30, 60),
        zIndex: 1,
      },
      Label: {
        zIndex: 2,
        text: {
          textColor: 0xffffffff,
          fontFace: "InterSemiBold",
        },
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: { scale: 1.0 },
      Image: {
        zIndex: 1,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 6,
          stroke: 0,
        },
      },
      ShadowLeft: {
        x: -30,
        color: 0x00000000,
        zIndex: 1,
      },
      ShadowRight: {
        x: 30,
        color: 0x00000000,
        zIndex: 1,
      },
      Label: {
        text: { textColor: 0x99ffffff, fontFace: "InterRegular" },
      },
    });
  }
}
