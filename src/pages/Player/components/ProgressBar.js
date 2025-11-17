import { Colors, Lightning, VideoPlayer } from '@lightningjs/sdk'
import formatTimeHMS from '../utils/formatTimeHMS'

export default class ProgressBar extends Lightning.Component {
  _timer = null
  numOfTicks = 0
  static _template() {
    return {
      w: 1690,
      h: 31,
      flex: {
        direction: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      CurrentTime: {
        w: 119,
        text: {
          text: '00:00:00',
          fontFace: 'InterRegular',
          fontSize: 26,
        },
      },
      Bar: {
        w: 1404,
        h: 13,
        BackgroundBar: {
          w: 1404,
          h: 13,
          texture: Lightning.Tools.getRoundRect(
            1404,
            13,
            0,
            2,
            Colors('#d9d9d9').alpha(0.1).get(),
            true,
            Colors('#d9d9d9').alpha(0.1).get(),
          ),
        },
        RedRect: {
          w: 0,
          h: 13,
          color: Colors('#ED1C24').get(),
          rect: true,
        },
        FocusPoint: {
          y: 7,
          w: 21,
          h: 21,
          rect: true,
          mount: 0.5,
          visible: false,
          texture: Lightning.Tools.getRoundRect(
            23,
            23,
            10,
            4,
            Colors('#ed1c24').get(),
            true,
            Colors('#d9d9d9').get(),
          ),
        },
      },
      EndTime: {
        w: 119,
        text: {
          text: '00:00:00',
          fontFace: 'InterRegular',
          fontSize: 26,
        },
      },
    }
  }

  get _CurrentTime() {
    return this.tag('CurrentTime')
  }

  get _EndTime() {
    return this.tag('EndTime')
  }

  get _FillBar() {
    return this.tag('FillBar')
  }

  get _RedRect() {
    return this.tag('RedRect')
  }

  get _FocusPoint() {
    return this.tag('FocusPoint')
  }

  get _BackgroundBar() {
    return this.tag('BackgroundBar')
  }

  progress(progress) {
    this._RedRect.setSmooth('w', progress)
    this._FocusPoint.setSmooth('x', progress)
    // console.log(progress);
    // console.log(this.numOfTicks);
  }

  _updateProgressBar(seekTime) {
    const newTimeToShow = seekTime ? seekTime : VideoPlayer.currentTime
    this.patch({
      CurrentTime: {
        text: formatTimeHMS(newTimeToShow),
      },
    })
    const progress = (newTimeToShow / VideoPlayer.duration) * this._BackgroundBar.w
    this.progress(progress)
  }

  _handleRight() {
    if (VideoPlayer.playing) VideoPlayer.pause()
    this.numOfTicks++
    const seekTime = this.computeSeekTime()
    this._updateProgressBar(seekTime)
    this.startTimer(true)
  }

  _handleRightRelease() {
    this.stopTimer()
  }

  _handleLeft() {
    if (VideoPlayer.playing) VideoPlayer.pause()
    this.numOfTicks--
    var seekTime = this.computeSeekTime()
    this._updateProgressBar(seekTime)
    this.startTimer(false)
  }

  _handleLeftRelease() {
    this.stopTimer()
  }

  _handleBack() {
    this.numOfTicks = 0
    this._updateProgressBar()
    return true
  }

  _handleEnter() {
    const seekTime = this.computeSeekTime()
    VideoPlayer.seek(seekTime)
    VideoPlayer.play()
    this.numOfTicks = 0
  }

  startTimer(forward) {
    if (this._timer) return
    this._timer = setInterval(() => {
      forward ? this.numOfTicks++ : this.numOfTicks--
      if (VideoPlayer.playing) VideoPlayer.pause()
      const seekTime = this.computeSeekTime()
      this._updateProgressBar(seekTime)
    }, 300)
  }

  computeSeekTime() {
    const seekTime = VideoPlayer.currentTime + this.numOfTicks * 5
    return seekTime < 0 ? 0 : seekTime > VideoPlayer.duration ? VideoPlayer.duration : seekTime
  }

  stopTimer() {
    if (!this._timer) return

    clearInterval(this._timer)
    this._timer = null
  }

  _focus() {
    this._FocusPoint.visible = true
    this.patch({
      Bar: {
        BackgroundBar: {
          texture: Lightning.Tools.getRoundRect(
            1404,
            13,
            0,
            2,
            Colors('#ED1C24').get(),
            true,
            Colors('#d9d9d9').alpha(0.1).get(),
          ),
        },
      },
    })
  }
  _unfocus() {
    this._FocusPoint.visible = false
    if (this.numOfTicks !== 0) {
      this.numOfTicks = 0
      this._updateProgressBar()
    }
    this.patch({
      Bar: {
        BackgroundBar: {
          texture: Lightning.Tools.getRoundRect(
            1404,
            13,
            0,
            2,
            Colors('#d9d9d9').alpha(0.1).get(),
            true,
            Colors('#d9d9d9').alpha(0.1).get(),
          ),
        },
      },
    })
  }
}
