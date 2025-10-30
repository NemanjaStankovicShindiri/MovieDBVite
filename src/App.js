import { Lightning, Utils } from "@lightningjs/sdk";
import ContentSection from "./components/ContentSection";
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
    return {
      Background: {
        w: 776,
        h: 1080,
        color: 0xff151515,
        rect: true,
      },
      GradientTexture: {
        x: 776,
        y: 0,
        w: 1920,
        h: 1080,
        src: Utils.asset("images/background.jpg"),
        clippg: true,
      },
      RectangleWithGradientDiagonal: {
        x: 776,
        y: 0,
        w: 1144,
        h: 1080,
        rect: true,
        colorRight: 0x00000000,
        colorLeft: 0xff151515,
      },
      Content: {
        x: 64,
        y: 125,
        w: 1241,
        h: 1080,
        type: ContentSection,
      },
      TopChannels: {
        x: 1415,
        y: 122,
        w: 312,
        h: 837,
        rect: true,
        color: 0xffff0000,
      },
    };
  }

  _getFocused() {
    return this.tag("Content");
  }
}
