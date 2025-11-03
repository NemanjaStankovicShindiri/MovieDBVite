import { Lightning, Utils, Router, Colors } from "@lightningjs/sdk";

export default class MoviesPage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: Colors("#d85454ff").get(),
        rect: true,
      },
    };
  }
}
