import { Lightning, Utils, Router } from "@lightningjs/sdk";
import HorizontalContainer from "../HorizontalContainer";
import NavbarButton from "./NavbarButton";
import MEDIA_TYPE from "../../consts/mediaType";
import { getRouteNavbarIndex } from "../../utils/getRouteNavbarIndex";

const buttons = [
  { label: "HOME", route: "home" },
  { label: MEDIA_TYPE.MOVIES, route: MEDIA_TYPE.MOVIES.toLowerCase() },
  { label: MEDIA_TYPE.SERIES, route: MEDIA_TYPE.SERIES.toLowerCase() },
];

export default class Navbar extends Lightning.Component {
  _buttons = [];
  static _template() {
    return {
      rect: true,
      x: 32,
      y: 32,
      w: 1841,
      h: 60,
      flex: { direction: "row" },
      color: 0x00000000,
      Logo: {
        src: Utils.asset("images/icon.png"),
        w: 301.8,
        h: 60,
        flexItem: { marginRight: 60 },
      },
      Buttons: {
        signals: {
          changeSelectedButton: true,
        },
        rect: true,
        w: 674,
        h: 49,
        y: -5,
        x: -20,
        color: 0x00000000,
        flexItem: {
          alignSelf: "center",
        },
        type: HorizontalContainer,
        props: { w: 674 },
      },
    };
  }
  _init() {
    const buttonsMaped = buttons.map((data, index) => ({
      type: NavbarButton,
      passSignals: { changeSelectedButton: true },

      props: { label: data.label, index },
    }));
    this._buttons = buttons;

    this.patch({
      Buttons: {
        props: {
          items: buttonsMaped,
          railTitle: "",
        },
      },
    });
  }
  _handleUp() {
    return true;
  }
  _handleLeft() {
    return true;
  }
  _handleRight() {
    return true;
  }
  get _Buttons() {
    return this.tag("Buttons");
  }
  _getFocused() {
    return this._Buttons;
  }

  _active() {
    setTimeout(() => {
      const activeHash = Router.getActiveHash();
      this._setSelected(getRouteNavbarIndex(activeHash.toLowerCase()));
    });
  }

  changeSelectedButton(index) {
    this._setSelected(index);
  }

  _setSelected(index) {
    this._Buttons.Items.children.forEach((item, i) => {
      item.patch({
        props: {
          selected: i === index,
        },
      });
    });
  }
}
