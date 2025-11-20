import { Colors, Lightning, VideoPlayer } from '@lightningjs/sdk';
import formatTimeHMS from '../utils/formatTimeHMS.js';
const DIRECTIONS = { LEFT: 'left', RIGHT: 'right' };
export default class ProgressBar extends Lightning.Component {
  _newTime = null;
  _numOfTriggers = 0;
  _speedUpTimer = null;
  _direction = null;
  static _template() {
    return {
      w: 1690,
      h: 31,
      passSignals: { setIsPlaying: true },
      flex: {
        direction: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      CurrentTime: {
        w: 140,
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
            Colors('#d9d9d9').alpha(0.1).get()
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
            Colors('#d9d9d9').get()
          ),
        },
      },
      EndTime: {
        w: 140,
        text: {
          text: '00:00:00',
          fontFace: 'InterRegular',
          fontSize: 26,
        },
      },
    };
  }

  get _CurrentTime() {
    return this.tag('CurrentTime');
  }

  get _EndTime() {
    return this.tag('EndTime');
  }

  get _FillBar() {
    return this.tag('FillBar');
  }

  get _RedRect() {
    return this.tag('RedRect');
  }

  get _FocusPoint() {
    return this.tag('FocusPoint');
  }

  get _BackgroundBar() {
    return this.tag('BackgroundBar');
  }

  progress(progress) {
    this._RedRect.setSmooth('w', progress);
    this._FocusPoint.setSmooth('x', progress);
  }

  _updateProgressBar() {
    const newTimeToShow = this._newTime != null ? this._newTime : VideoPlayer.currentTime;
    this.patch({
      CurrentTime: {
        text: formatTimeHMS(newTimeToShow),
      },
      EndTime: {
        text: ' -' + formatTimeHMS(VideoPlayer.duration - newTimeToShow),
      },
    });
    const progress = (newTimeToShow / VideoPlayer.duration) * this._BackgroundBar.w;
    this.progress(progress);
  }

  _handleRight() {
    if (this._direction === DIRECTIONS.LEFT || this._direction === null) {
      this._numOfTriggers = 0;
      this._direction = DIRECTIONS.RIGHT;
    }
    if (this._speedUpTimer === null) {
      this._speedUpTimer = setInterval(() => {
        if (this._numOfTriggers < 25) this._numOfTriggers += 5;
      }, 500);
    }
    if (this._newTime == null) {
      this._newTime = VideoPlayer.currentTime;
    }
    this._newTime = this.computeSeekTime(5 + this._numOfTriggers);
    this._updateProgressBar();
  }

  _handleRightRelease() {
    clearInterval(this._speedUpTimer);
    this._speedUpTimer = null;
    this._numOfTriggers = 0;
  }
  _handleLeftRelease() {
    clearInterval(this._speedUpTimer);
    this._speedUpTimer = null;
    this._numOfTriggers = 0;
  }

  _handleLeft() {
    if (this._direction === DIRECTIONS.RIGHT || this._direction === null) {
      this._numOfTriggers = 0;
      this._direction = DIRECTIONS.LEFT;
    }
    if (this._speedUpTimer === null) {
      this._speedUpTimer = setInterval(() => {
        if (this._numOfTriggers < 25) this._numOfTriggers += 5;
      }, 500);
    }
    if (this._newTime == null) {
      this._newTime = VideoPlayer.currentTime;
    }
    this._newTime = this.computeSeekTime(-5 - this._numOfTriggers);
    this._updateProgressBar();
  }

  _handleBack() {
    if (this._newTime === VideoPlayer.currentTime || this._newTime === null) return false;
    this._newTime = null;
    this._updateProgressBar();
    return true;
  }

  _handleEnter() {
    if (this._newTime !== null && this._newTime !== VideoPlayer.currentTime) {
      VideoPlayer.seek(this._newTime);
    } else {
      if (VideoPlayer.playing && !this.fireAncestors('$getIsSeeking')) {
        VideoPlayer.pause();
        this.signal('setIsPlaying', false);
      } else {
        VideoPlayer.play();
        this.signal('setIsPlaying', true);
      }
    }
    this._newTime = null;
  }

  computeSeekTime(timeToAdd) {
    const seekTime = this._newTime + timeToAdd;
    return seekTime < 0 ? 0 : seekTime > VideoPlayer.duration ? VideoPlayer.duration : seekTime;
  }

  _focus() {
    this._FocusPoint.visible = true;
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
            Colors('#d9d9d9').alpha(0.1).get()
          ),
        },
      },
    });
  }
  _unfocus() {
    this._FocusPoint.visible = false;
    if (this._newTime !== 0) {
      this._newTime = null;
      this._updateProgressBar();
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
            Colors('#d9d9d9').alpha(0.1).get()
          ),
        },
      },
    });
  }
}
