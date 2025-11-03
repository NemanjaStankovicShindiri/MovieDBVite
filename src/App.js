import { Lightning, Utils } from "@lightningjs/sdk";
import HomePage from "./pages/HomePage";

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
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xffff0000,
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
