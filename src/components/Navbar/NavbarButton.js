import { Lightning, Router } from "@lightningjs/sdk";
import Color from "@lightningjs/sdk/src/Colors";

export default class NavbarButton extends Lightning.Component {
  _index = 0;
  static _template() {
    return {
      w: 118,
      h: 49,
      rect: true,
      color: Color("rgba(247, 0, 247, 0)").get(),
      flex: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 20,
        paddingButton: 10,
        direction: "column",
        justifyContent: "center",
      },
      flexItem: {
        marginLeft: 20,
        marginRight: 20,
      },
      Label: {
        w: 150,
        text: {
          text: "",
          fontFace: "InterBold",
          fontSize: 24,
          textAlign: "center",
          spacing: 6,
        },
      },
      Line: {
        w: 150,
        y: 10,
        h: 4,
        rect: true,
        shader: { type: lng.shaders.RoundedRectangle },
        alpha: 0,
      },
    };
  }
  set props({ label, index }) {
    this.patch({
      Label: {
        text: {
          text: label,
        },
      },
    });
    this._index = index;
  }
  _focus() {
    const activeHash = Router.getActiveHash();
    console.log(activeHash);
    this.patch({ Line: { alpha: 1 } });
  }

  _unfocus() {
    this.patch({ Line: { alpha: 0 } });
  }

  _handleEnter() {
    this.fireAncestors("$changePage", this._index);
    Router.focusPage();
  }
}
