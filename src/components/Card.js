import { Lightning, Utils } from "@lightningjs/sdk";
import { Img } from "@lightningjs/sdk";
import navigateToDetailsPage from "../utils/navigateToDetailsPage";

export default class Card extends Lightning.Component {
  _id = null;
  _backdrop_path = null;
  _type = "";
  _overview = "";
  _title = "";
  static _template() {
    return {
      w: 229,
      h: 359,
      passSignals: { changeHeroBackground: true },
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
  set props({ image, label, id, backdrop_path, overview, type }) {
    this._id = id;
    this._backdrop_path = backdrop_path;
    this._type = type;
    this._title = label;
    this._overview = overview;
    this.patch({
      Image: {
        texture: Img(image).portrait(200, 200),
      },
      Label: { text: label },
    });
  }

  _handleEnter() {
    navigateToDetailsPage(this._id, this._type);
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
    this.signal(
      "changeHeroBackground",
      this._backdrop_path,
      this._title,
      this._overview
    );
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
