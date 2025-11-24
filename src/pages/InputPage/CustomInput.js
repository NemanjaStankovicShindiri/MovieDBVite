import { Input } from '@lightningjs/ui-components';
export default class CustomInput extends Input {
  _init() {
    this.patch({
      TextArea: {
        password: true,
        mask: '*',
      },
    });
  }
  _handleLeft() {
    return false;
  }
  _handleRight() {
    return false;
  }
  _focus() {
    super._focus();
    this.listening = true;
    this.fireAncestors('$setLastSelectedInput', this);
  }
  _unfocus() {
    super._unfocus();
    this.listening = false;
  }
}
