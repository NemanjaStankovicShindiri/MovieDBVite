import { Lightning, Router } from "@lightningjs/sdk";
import WatchNowButton from "./components/WatchNowButton";
import BackButton from "./components/BackButton";

export default class DetailsPage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff151515,
      },
      DetailsWindow: {
        w: 1083,
        h: 700,
        rect: true,
        color: 0xff151515,
        flex: { direction: "column" },
        x: 69,
        y: 65,
        BackButton: {
          type: BackButton,
        },
        DetailsPageContent: {
          w: 1083,
          h: 592,
          flex: { direction: "column" },
          HeaderDetails: {
            h: 82,
            w: 1083,
            flex: { direction: "column" },
            flexItem: { marginBottom: 25 },
            Genres: {
              h: 29,
              w: 1083,
              text: {
                fontSize: 20,
                lineHeight: 29,
                text: "",
                fontFace: "InterRegular",
              },
            },
            Runtime: {
              h: 29,
              w: 1083,
              text: {
                fontSize: 20,
                lineHeight: 29,
                text: "",
                fontFace: "InterRegular",
              },
            },
            DetailsMeta: {
              h: 24,
              w: 1083,
              text: {
                fontSize: 20,
                lineHeight: 29,
                text: "",
                fontFace: "InterRegular",
              },
            },
          },
          DetailsInfoContainer: {
            w: 1083,
            h: 485,
            flex: { direction: "row", alignItems: "center" },
            Image: {
              w: 325,
              h: 485,
              flexItem: { marginRight: 60 },
            },
            About: {
              w: 698,
              h: 435,
              BasicInfo: {
                flex: { direction: "column" },
                Title: {
                  h: 34,
                  flexItem: { marginBottom: 24 },
                  text: {
                    text: "",
                    fontFace: "InterSemiBold",
                    fontSize: 28,
                  },
                },
                Description: {
                  w: 698,
                  h: 124,
                  flexItem: { marginBottom: 37 },
                  text: {
                    fontFace: "InterSemiBold",
                    fontSize: 22,
                    lineHeight: 31,
                    maxLines: 4,
                  },
                },
                People: {
                  flex: { direction: "column" },
                  w: 698,
                  h: 101,
                  flexItem: { marginButtom: 37 },
                  Director: {
                    flex: { direction: "row" },
                    Label: {
                      text: {
                        text: "Director: ",
                        fontFace: "InterSemiBold",
                        fontSize: 22,
                        lineHeight: 31,
                      },
                    },
                    Value: {
                      w: 698,
                      text: {
                        text: "",
                        fontFace: "InterRegular",
                        fontSize: 22,
                        lineHeight: 31,
                        maxLines: 1,
                      },
                    },
                  },
                  Cast: {
                    flex: { direction: "row" },
                    Label: {
                      text: {
                        text: "Cast: ",
                        fontFace: "InterSemiBold",
                        fontSize: 22,
                        lineHeight: 31,
                      },
                    },
                    Value: {
                      w: 698,
                      text: {
                        text: "",
                        fontFace: "InterRegular",
                        fontSize: 22,
                        lineHeight: 31,
                        maxLines: 2,
                      },
                    },
                    flexItem: {
                      marginBottom: 37,
                    },
                  },
                  WatchNowButton: {
                    type: WatchNowButton,
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  set props(props) {
    console.log(props);
    this.patch({
      DetailsWindow: {
        DetailsPageContent: {
          HeaderDetails: {
            Genres: {
              text: { text: props.genres.map((g) => g.name).join(", ") },
            },
            Runtime: {
              text: { text: props.runtime + " Minutes" },
            },
            DetailsMeta: {
              text: {
                text:
                  props?.origin_country?.map((g) => g).join(", ") +
                    " - " +
                    props?.release_date.split("-")[0] +
                    " - " +
                    props?.rating +
                    " - IMDb: " +
                    props?.vote_average.toFixed(1) || "N/A",
              },
            },
          },
          DetailsInfoContainer: {
            Image: {
              src: `${import.meta.env.VITE_POSTER_URL}${props.poster_path}`,
            },
            About: {
              BasicInfo: {
                Title: { text: { text: props.title } },
                Description: { text: { text: props.overview } },
                People: {
                  Director: {
                    Value: { text: { text: props.credits.director } },
                  },
                  Cast: { Value: { text: { text: props.credits.cast } } },
                },
              },
            },
          },
        },
      },
    });
    this._setState("WatchNowButton");
  }
  get _BackButton() {
    return this.tag("BackButton");
  }
  get _WatchNowButton() {
    return this.tag("WatchNowButton");
  }
  _init() {
    this._setState("WatchNowButton");
  }

  _getFocused() {
    return this._WatchNowButton;
  }

  _handleBack(e) {
    console.log("back");
    if (Router.isNavigating()) {
      return;
    }
    e.preventDefault();

    const routerHistory = Router.getHistory().filter(
      (history) => history.hash != "splash" && history.hash != "cmp"
    );

    if (routerHistory.length) {
      console.log(Router.getHistory());
      Router.back();
    } else {
      Router.navigate("home");
    }
  }

  static _states() {
    return [
      class BackButton extends this {
        _getFocused() {
          return this._BackButton;
        }
        _handleDown() {
          this._setState("WatchNowButton");
        }
      },
      class WatchNowButton extends this {
        _getFocused() {
          return this._WatchNowButton;
        }
        _handleUp() {
          this._setState("BackButton");
        }
      },
    ];
  }
}
