import { Lightning, Utils, Router, Colors } from "@lightningjs/sdk";
import HorizontalContainer from "../../components/HorizontalContainer";
import Card from "../../components/Card";
import { Img } from "@lightningjs/sdk";

export default class MoviesPage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: Colors("#151515").get(),
        rect: true,
        flex: { direction: "column" },

        Hero: {
          h: 697,
          w: (w) => w,
          rect: true,
          src: Utils.asset("images/background.jpg"),
        },
        Slider: {
          signals: {
            changeHeroBackground: true,
          },
          x: 64,
          h: 302,
          rect: true,
          color: Colors("#151515").get(),
          type: HorizontalContainer,
        },
      },
    };
  }
  changeHeroBackground(id, backdrop_path) {
    console.log("grand");
    this.patch({
      Background: {
        Hero: {
          texture: Img("https://image.tmdb.org/t/p/w780" + backdrop_path).cover(
            1920,
            697
          ),
        },
      },
    });
  }
  get _Slider() {
    return this.tag("Slider");
  }
  _getFocused() {
    return this._Slider._getFocused();
  }

  _init() {
    this._setState("Slider");
  }

  set props(props) {
    const cards = props.map((item) => {
      return {
        w: 403,
        h: 302,
        type: Card,
        signals: { changeHeroBackground: true }, // <--- pass signal
        props: {
          backdrop_path: item.backdrop_path,
          image: `${"https://image.tmdb.org/t/p/w300"}${item.backdrop_path}`,
          label: item.title,
          id: item.id,
        },
      };
    });

    this.patch({
      Background: {
        Slider: {
          props: {
            w: 1400,
            h: 215,
            items: cards,
            railTitle: "",
            targetIndex: 0,
          },
        },
      },
      HorizontalGradient: {
        x: 0,
        y: 0,
        w: 1920,
        h: 697,
        rect: true,
        colorRight: Colors("#151515").alpha(0.6).get(),
        colorLeft: Colors("#151515").get(),
      },
      VerticalGradient: {
        x: 0,
        y: 0,
        w: 1920,
        h: 697,
        rect: true,
        colorTop: Colors("#151515").alpha(0).get(),
        colorBottom: Colors("#151515").get(),
      },
    });
  }
  static _states() {
    return [
      class Slider extends this {
        _getFocused() {
          return this._Slider;
        }
        _handleUp() {
          Router.focusWidget("Menu");
        }
      },
    ];
  }
}
