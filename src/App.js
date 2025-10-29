import { Lightning, Utils } from "@lightningjs/sdk";
import MovieRow from "./movieRow";
const movies = [
  { label: "Dead of winter", image: "images/1.jpg" },
  { label: "Winter of dead", image: "images/2.jpg" },
  { label: "Dead winter off", image: "images/3.jpg" },
  { label: "Dead of dead", image: "images/2.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
  { label: "Winter of winter", image: "images/1.jpg" },
];

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
      MovieRow1: {
        type: MovieRow,
        x: 64,
        y: 125,
        w: 1241,
        h: 359,
        color: 0xff121212,
        props: {
          items: movies,
          raillabel: "MOVIES",
        },
      },
      MovieRow2: {
        type: MovieRow,
        x: 64,
        y: 548,
        w: 1241,
        h: 359,
        color: 0xff121212,
        props: {
          items: movies,
          raillabel: "SERIES",
        },
      },
    };
  }
}
