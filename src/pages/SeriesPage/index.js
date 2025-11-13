import { Lightning, Utils, Router, Colors } from "@lightningjs/sdk";
import HorizontalContainer from "../../components/HorizontalContainer";
import Card from "../../components/Card";
import { Img } from "@lightningjs/sdk";
import { debounce } from "lodash";
import MEDIA_TYPE from "../../consts/mediaType";
import handleBack from "../../utils/handleBack";
import { getRouteNavbarIndex } from "../../utils/getRouteNavbarIndex";

export default class SeriesPage extends Lightning.Component {
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
          TextContainer: {
            zIndex: 1,
            x: 69,
            y: 258,
            w: 698,
            h: 182,
            flex: { direction: "column" },
            Title: {
              w: 698,
              text: {
                fontFace: "InterSemiBold",
                fontSize: 28,
                text: "",
                maxLines: 1,
              },
            },
            Overview: {
              w: 698,
              text: {
                fontFace: "InterSemiBold",
                fontSize: 22,
                lineHeight: 31,
                text: "",
                maxLines: 4,
                textOverflow: "ellipsis",
                maxLinesSuffix: "...",
              },
            },
          },
        },
        Slider: {
          signals: {
            changeHeroBackground: true,
          },
          x: 64,
          h: 302,
          w: 1780,
          rect: true,
          color: Colors("#151515").get(),
          type: HorizontalContainer,
        },
      },
    };
  }

  _debouncedChangeHero = debounce((backdrop_path, title, overview) => {
    const fadeIn = this._Hero.animation({
      duration: 1,
      repeat: 0,
      stopMethod: "immediate",
      actions: [
        {
          p: "alpha",
          v: { 0: 0, 1: 1 },
        },
      ],
    });
    this.patch({
      Background: {
        Hero: {
          texture: Img(
            "https://image.tmdb.org/t/p/w1280" + backdrop_path
          ).cover(1920, 697),
          TextContainer: {
            Title: { text: { text: title } },
            Overview: { text: { text: overview } },
          },
        },
      },
    });
    fadeIn.start();
  }, 500);

  changeHeroBackground(backdrop_path, title, overview) {
    this._debouncedChangeHero(backdrop_path, title, overview);
  }
  get _Slider() {
    return this.tag("Slider");
  }
  get _Hero() {
    return this.tag("Hero");
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
        passSignals: { changeHeroBackground: true },
        props: {
          backdrop_path: item.backdrop_path,
          image: `${"https://image.tmdb.org/t/p/w300"}${item.backdrop_path}`,
          label: item.title,
          id: item.id,
          type: MEDIA_TYPE.SERIES.toLowerCase(),
          overview: item.overview,
        },
      };
    });

    this.patch({
      Background: {
        Slider: {
          props: {
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

  _handleBack(e) {
    handleBack(e);
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
