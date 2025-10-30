import VerticalContainer from "../containers/VerticalContainer/VerticalContainer";
import VerticalItem from "../containers/VerticalContainer/VerticalItem/VerticalItem";

const topChannelsData = [
  { name: "CBS", image: "CBS.svg" },
  { name: "NBC", image: "NBC.png" },
  { name: "ABC", image: "ABC.png" },
  { name: "Fox", image: "FOX.svg" },
  { name: "Fox News Channel", image: "FNC.png" },
];

export default class TopChannels extends Lightning.Component {
  static _template() {
    return {
      Column: {
        w: 1900,
        h: 359,
        type: VerticalContainer,
      },
    };
  }
  get _Column() {
    return this.tag("Column");
  }

  set props({ items, raillabel }) {
    const cards = topChannelsData.map((data) => ({
      type: VerticalItem,
      props: {
        image: data.image,
        label: data.name,
      },
    }));

    this.patch({
      Row: {
        props: {
          items: cards,
          railTitle: raillabel,
        },
      },
    });
  }
}
