import { Lightning, Utils } from "@lightningjs/sdk";
import ContentSection from "./ContentSection";
export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: "Inter", url: Utils.asset("fonts/Inter_24pt-Bold.ttf") }];
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background.jpg"),
      },
      Content: {
        x: 64,
        y: 125,
        w: 1920,
        h: 1080,
        type: ContentSection,
        clipping: true,
        collision: true,
      },
    };
  }
}
