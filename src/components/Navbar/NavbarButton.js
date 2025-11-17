import { Lightning, Router, Colors } from '@lightningjs/sdk'
import Color from '@lightningjs/sdk/src/Colors'
import { getRouteFromIndex } from '../../utils/getRouteFromIndex'

export default class NavbarButton extends Lightning.Component {
  _props = { _index: 0, _selected: false }
  static _template() {
    return {
      w: 118,
      h: 49,
      rect: true,
      color: Color('rgba(247, 0, 247, 0)').get(),
      flex: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 20,
        paddingButton: 10,
        direction: 'column',
        justifyContent: 'center',
      },
      flexItem: {
        marginLeft: 20,
        marginRight: 20,
      },
      Label: {
        w: 150,
        color: Colors('#ffffff').alpha(0.4).get(),
        text: {
          text: '',
          fontFace: 'InterBold',
          fontSize: 24,
          textAlign: 'center',
          spacing: 6,
        },
      },
      Line: {
        color: Colors('#ed1c24').get(),
        w: 150,
        y: 10,
        h: 4,
        rect: true,
        shader: { type: Lightning.shaders.RoundedRectangle },
        alpha: 0,
      },
    }
  }
  set props(props) {
    this._props = { ...this._props, ...props }
    const { label, index, selected } = this._props
    this.patch({
      Label: {
        color: selected ? Colors('#ffffff').alpha(1).get() : Colors('#ffffff').alpha(0.4).get(),
        text: {
          text: label,
        },
      },
    })
    this._index = index
    this._selected = selected ? selected : false
  }
  _focus() {
    this.patch({ Line: { alpha: 1 } })
  }

  _unfocus() {
    this.patch({ Line: { alpha: 0 } })
  }

  _handleEnter() {
    Router.navigate(getRouteFromIndex(this._index))
    Router.focusPage()
  }
}
