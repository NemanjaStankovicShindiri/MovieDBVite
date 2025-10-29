import Lightning from "@lightningjs/sdk/src/Lightning";

export default class ContentSection extends Lightning.Component {
  static _template() {
    return {
      MoviesSection: {
        w: 1241,
        h: 360,
        type: HorizontalContainer,
      },
      SeriesSection: {
        y: 423,
        w: 1241,
        h: 404,
        type: HorizontalContainer,
      },
      LiveButton: {
        y: 846,
        type: LiveButton,
      },
    };
  }
}
