import { Lightning, Utils, Router } from "@lightningjs/sdk";
import Color from "@lightningjs/sdk/src/Colors";
import HorizontalContainer from "../../containers/HorizontalContainer";
import NavbarButton from "./NavbarButton";

const buttons = [
  { label: "HOME", route: "home" },
  { label: "MOVIES", route: "movies" },
  { label: "SERIES", route: "series" },
];

export default class Navbar extends Lightning.Component {
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
    const navbarButtons = buttons.map((data) => ({
      type: NavbarButton,
      props: { label: data.label },
    }));

    this.patch({
      Buttons: {
        props: {
          items: navbarButtons,
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
}
