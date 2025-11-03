import { Lightning, Utils } from "@lightningjs/sdk";
import HomePage from "./pages/HomePage";

export default class App extends Lightning.Component {
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
    return { HomePage: { type: HomePage } };
  }

  _getFocused() {
    return this.tag("HomePage");
  }
}
