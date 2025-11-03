import { Lightning, Utils, Router, Colors } from "@lightningjs/sdk";

const topChannelsData = [
  { name: "CBS", image: "CBS.png" },
  { name: "NBC", image: "NBC.png" },
  { name: "ABC", image: "ABC.png" },
  { name: "Fox", image: "FOX.png" },
  { name: "Fox News Channel", image: "FNC.png" },
];

export default class SeriesPage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: Colors("#5151dfff").get(),
        rect: true,
      },
    };
  }
}
