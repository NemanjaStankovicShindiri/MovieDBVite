import { Router, Utils, Lightning, Colors } from "@lightningjs/sdk";
import routes from "../src/routes";
import Navbar from "../src/components/Navbar/index";
import LoadingScreenComponent from "./components/LOadingScreenComponent";

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: "InterBold", url: Utils.asset("fonts/Inter_18pt-Bold.ttf") },
      {
        family: "InterSemiBold",
        url: Utils.asset("fonts/Inter_18pt-semiBold.ttf"),
      },
      {
        family: "InterRegular",
        url: Utils.asset("fonts/Inter_18pt-Regular.ttf"),
      },
    ];
  }

  static _template() {
    return {
      ...super._template(),
      Pages: {
        collision: true,
        w: 1920,
        h: 1080,
      },
      Loading: {
        type: LoadingScreenComponent,
      },
      Widgets: {
        Menu: {
          zIndex: 2,
          type: Navbar,
        },
      },
    };
  }

  _setup() {
    Router.startRouter(
      {
        ...routes,
      },
      this
    );
  }
}
