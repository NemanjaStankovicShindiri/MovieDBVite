import { Lightning, VideoPlayer, Colors, Router, Utils } from '@lightningjs/sdk';
import { loader, unloader } from '../../components/Player/HLS';
import PlayerControllButton from './components/PlayerControllButton';
import HorizontalContainer from '../../components/HorizontalContainer';
import ProgressBar from './components/ProgressBar';
import formatTimeHMS from './utils/formatTimeHMS.js';
const buttons = [
  { label: 'rewind', src: 'rewind.png', size: 66 },
  { label: 'playPause', src: 'pause.png', size: 90 },
  { label: 'forward', src: 'forward.png', size: 66 },
];
export default class Player extends Lightning.Component {
  _isPlaying = false;
  static _template() {
    return {
      x: 0,
      y: 0,
      w: 1920,
      h: 1080,
      rect: true,
      colorTop: Colors('#000000').alpha(0).get(),
      colorBottom: Colors('#000000').get(),
      Spinner: {
        w: 100,
        h: 100,
        x: 960,
        y: 540,
        texture: Lightning.Tools.getSvgTexture(Utils.asset('images/spinner.svg'), 100, 100),
        mount: 0.5,
        rotation: 0,
      },
      Controller: {
        w: 1690,
        h: 156,
        x: 115,
        y: 836,
        ButtonWrapper: {
          w: 995,
          h: 90,
          BackButton: {
            y: 45,
            type: PlayerControllButton,
            color: Colors('#ffffff').alpha(0.3).get(),
            props: {
              w: 66,
              h: 66,
              src: 'images/player/back.png',
              label: 'back',
            },
          },
          CenteredButtonWrapper: {
            x: 845,
            y: 45,
            mountX: 0.5,
            w: 312,
            h: 200,
            flex: {
              direction: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
            type: HorizontalContainer,
          },
        },
        ProgressBar: {
          y: 961 - 836,
          type: ProgressBar,
        },
      },
    };
  }

  _init() {
    const buttonsMaped = buttons.map((item) => ({
      type: PlayerControllButton,
      props: {
        w: item.size,
        h: item.size,
        src: 'images/player/' + item.src,
        label: item.label,
        flex: { alignSelf: 'center' },
      },
    }));
    this.patch({
      Controller: {
        ButtonWrapper: {
          CenteredButtonWrapper: {
            props: { items: buttonsMaped, targetIndex: 1, disableScroll: true },
          },
        },
      },
    });
    this._setState('CenteredButtonWrapper');
    this._spin();
  }

  $setIsPlaying(status) {
    this._isPlaying = status;
    const playButton = this._CenteredButtonWrapper.Items.children.find(
      (element) => element._props.label === 'playPause'
    );
    playButton.patch({
      src: Utils.asset(status ? 'images/player/pause.png' : 'images/player/play.png'),
    });
  }

  $getIsPlaying() {
    return this._isPlaying;
  }

  $videoPlayerLoadedData() {
    this._ProgressBar._EndTime.patch({
      text: {
        text: formatTimeHMS(VideoPlayer.duration),
        fontFace: 'InterRegular',
        fontSize: 26,
      },
    });
  }

  $videoPlayerAbort() {
    console.log('videoPlayerAbort');
  }

  $videoPlayerCanPlayThrough() {
    console.log('videoPlayerCanPlayThrough');
  }
  $videoPlayerDurationChange() {
    console.log('videoPlayerDurationChange');
  }
  $videoPlayerEmptied() {
    console.log('videoPlayerEmptied');
  }
  $videoPlayerEncrypted() {
    console.log('videoPlayerEncrypted');
  }
  $videoPlayerEnded() {
    this.$setIsPlaying(false);
  }
  $videoPlayerError(e) {
    if (e.event.name === 'NotAllowedError') Router.navigate('home');
  }
  $videoPlayerInterruptBegin() {
    console.log('videoPlayerInterruptBegin');
  }
  $videoPlayerInterruptEnd() {
    console.log('videoPlayerInterruptEnd');
  }
  $videoPlayerLoadedMetadata() {
    console.log('videoPlayerLoadedMetadata');
  }
  $videoPlayerLoadStart() {
    console.log('videoPlayerLoadStart');
  }
  $videoPlayerPlaying() {
    this._isPlaying = true;
  }
  $videoPlayerProgress() {
    console.log('videoPlayerProgress');
  }
  $videoPlayerRatechange() {
    console.log('videoPlayerRatechange');
  }
  $videoPlayerSeeked() {
    this._Spinner.visible = false;
  }
  $videoPlayerSeeking() {
    this._Spinner.visible = true;
  }
  $videoPlayerStalled() {
    console.log('videoPlayerStalled');
  }
  $videoPlayerTimeUpdate() {
    this._ProgressBar._updateProgressBar();
  }
  $videoPlayerVolumeChange() {
    console.log('videoPlayerVolumeChange');
  }

  $videoPlayerClear() {
    console.log('videoPlayerClear');
  }

  _showSpinner() {
    this._Spinner.visible = true;
  }

  _hideSpinner() {
    this._Spinner.visible = false;
  }

  $videoPlayerCanPlay() {
    this._hideSpinner();
  }

  $videoPlayerWaiting() {
    this._showSpinner();
  }

  _getFocused() {
    return this._CenteredButtonWrapper._getFocused();
  }

  get _BackButton() {
    return this.tag('BackButton');
  }

  _handleLeft() {
    return this._CenteredButtonWrapper._handleLeft();
  }

  _handleRight() {
    return this._CenteredButtonWrapper._handleRight();
  }

  get _ProgressBar() {
    return this.tag('ProgressBar');
  }

  get _Rewind() {
    return this.tag('Rewind');
  }

  get _PlayPauseButton() {
    return this.tag('PlayPauseButton');
  }

  get _Forward() {
    return this.tag('Forward');
  }

  get _CenteredButtonWrapper() {
    return this.tag('CenteredButtonWrapper');
  }

  get _Spinner() {
    return this.tag('Spinner');
  }

  _enable() {
    this.fireAncestors('$punchHole');
    VideoPlayer.position(0, 0);
    VideoPlayer.size(1920, 1080);
    VideoPlayer.consumer(this);
    VideoPlayer.loader(loader);
    VideoPlayer.unloader(unloader);
    VideoPlayer.loop(false);
    VideoPlayer.open('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
    VideoPlayer.play();
  }

  _disable() {
    this.fireAncestors('$unpunchHole');
    VideoPlayer.clear();
  }

  $exitVideo() {
    VideoPlayer.close();
    Router.back();
  }

  static _states() {
    return [
      class BackButton extends this {
        _getFocused() {
          return this._BackButton;
        }
        _handleRight() {
          this._setState('CenteredButtonWrapper');
        }
        _handleDown() {
          this._setState('ProgressBar');
        }
      },
      class CenteredButtonWrapper extends this {
        _getFocused() {
          return this._CenteredButtonWrapper;
        }
        _handleDown() {
          this._setState('ProgressBar');
        }
        _handleLeft() {
          this._setState('BackButton');
        }
      },
      class ProgressBar extends this {
        _getFocused() {
          return this._ProgressBar;
        }
        _handleUp() {
          this._setState('CenteredButtonWrapper');
        }
        _handleBack() {
          this._setState('CenteredButtonWrapper');
        }
      },
    ];
  }
  _spin() {
    this._Spinner
      .animation({
        duration: 2, // animation duration in seconds
        repeat: -1, // repeat indefinitely
        actions: [
          { p: 'rotation', v: { 0: 0, 1: 10 * Math.PI } }, // rotate 360 degrees
        ],
      })
      .start();
  }
}
