import { Lightning, Utils } from "@lightningjs/sdk";

export default class extends Lightning.Component {
  static _template() {
    return {
      w: 286,
      h: 78,
      texture: Lightning.Tools.getRoundRect(
        286,
        78,
        30,
        0,
        0x00000000,
        true,
        0xff2f2f2f
      ),
      Button: {
        x: 143,
        y: 39,
        mount: 0.5,
        flex: {
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        Image: {
          w: 24,
          h: 24,
          src: Utils.asset("images/play.png"),
          flexItem: { marginRight: 10 },
        },
        Text: {
          h: 24,
          text: {
            text: "WATCH NOW",
            fontFace: "InterSemiBold",
            fontSize: 20,
            letterSpacing: 3,
          },
        },
      },
    };
  }
  _focus() {
    this.patch({
      texture: Lightning.Tools.getRoundRect(
        286,
        78,
        30,
        0,
        0x00000000,
        true,
        0xffed1c24
      ),
    });
  }
  _unfocus() {
    this.patch({
      texture: Lightning.Tools.getRoundRect(
        286,
        78,
        30,
        0,
        0x00000000,
        true,
        0xff2f2f2f
      ),
    });
  }
}
