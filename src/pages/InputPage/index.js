import { Colors, Lightning } from '@lightningjs/sdk';
import { KeyboardSearch } from '@lightningjs/ui-components';
import HorizontalContainer from '../../components/HorizontalContainer';
import CustomInput from '../InputPage/CustomInput';

const inputFields = [
  { x: 100, helpText: 'Username' },
  { x: 200, helpText: 'Password' },
  { x: 300, helpText: 'Code' },
];

export default class InputPage extends Lightning.Component {
  _lastSelectedInput = this._InputArray.Items.children[0];
  static _template() {
    return {
      w: 1920,
      h: 1080,
      InputArray: {
        w: 1920,
        h: 100,
        rect: true,
        color: Colors('#ff0000').alpha(0.1).get(),
        type: HorizontalContainer,
        disableScroll: true,
      },
      Keyboard: {
        x: 960,
        y: 300,
        type: KeyboardSearch,
        mountX: 0.5,
      },
    };
  }

  _init() {
    const items = inputFields.map((field) => ({
      type: CustomInput,
      x: field.x,
      helpText: field.helpText,
    }));

    this._InputArray.patch({
      props: {
        items,
        railTitle: '',
      },
    });
  }

  get _InputArray() {
    return this.tag('InputArray');
  }

  get _Keyboard() {
    return this.tag('Keyboard');
  }

  _getFocused() {
    return this._setState('Keyboard');
  }

  $setLastSelectedInput(inputEl) {
    this._lastSelectedInput = inputEl;
  }

  $onSoftKey({ key }) {
    this._lastSelectedInput.listening = true;
    switch (key) {
      case 'space':
        this._lastSelectedInput.insert(' ');
        break;
      case 'delete':
        this._lastSelectedInput.backspace();
        break;
      default:
        this._lastSelectedInput.insert(key);
    }
  }

  static _states() {
    return [
      class InputArray extends this {
        _getFocused() {
          return this._InputArray;
        }
        _handleDown() {
          this._setState('Keyboard');
        }
      },
      class Keyboard extends this {
        _getFocused() {
          return this._Keyboard;
        }
        _handleUp() {
          this._setState('InputArray');
        }
      },
    ];
  }
}
