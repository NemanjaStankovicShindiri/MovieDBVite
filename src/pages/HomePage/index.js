import { Lightning, Utils, Router } from "@lightningjs/sdk";
import ContentSection from "../../components/ContentSection";
import TopChannels from "../../components/TopChannels";
import LivePlayerButton from "../../components/LivePlayerButton";

const topChannelsData = [
  { name: "CBS", image: "CBS.png" },
  { name: "NBC", image: "NBC.png" },
  { name: "ABC", image: "ABC.png" },
  { name: "Fox", image: "FOX.png" },
  { name: "Fox News Channel", image: "FNC.png" },
];

export default class HomePage extends Lightning.Component {
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
        clipping: true,
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
        rect: true,
        type: TopChannels,
        props: topChannelsData,
      },
      LivePlayerButton: {
        type: LivePlayerButton,
      },
    };
  }

  _init() {
    this._setState("Content");
  }

  get _Content() {
    return this.tag("Content");
  }
  get _TopChannels() {
    return this.tag("TopChannels");
  }

  set props(props) {
    this.patch({ Content: { props } });
  }

  _getFocused() {
    return this._Content;
  }

  get _LivePlayerButton() {
    return this.tag("LivePlayerButton");
  }

  static _states() {
    return [
      class Content extends this {
        _getFocused() {
          return this._Content;
        }
        _handleUp() {
          Router.focusWidget("Menu");
          const hash = Router.getActiveHash();
          console.log(hash);
        }
        _handleRight() {
          this._setState("TopChannels");
          return true;
        }
        _handleDown() {
          this._setState("LivePlayerButton");
          return true;
        }
      },
      class TopChannels extends this {
        _getFocused() {
          return this._TopChannels;
        }
        _handleLeft() {
          this._setState("Content");
          return true;
        }
      },
      class LivePlayerButton extends this {
        _getFocused() {
          return this._LivePlayerButton;
        }
        _handleUp() {
          this._setState("Content");
          return true;
        }
      },
    ];
  }
}
