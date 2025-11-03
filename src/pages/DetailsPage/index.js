import Lightning from "@lightningjs/sdk";
export default class DetailsPage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff000000,
      },
      Label: {
        text: {
          text: "",
          fontSize: 16,
          fontFace: "InterRegular",
          textColor: 0xffffffff,
        },
      },
    };
  }
  set params(args) {
    this.patch({ Label: { text: { text: args.mediaId } } });
  }
}
