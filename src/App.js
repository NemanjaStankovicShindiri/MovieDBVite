import { Router, Utils, Lightning, Colors } from '@lightningjs/sdk';
import routes from '../src/routes';
import Navbar from '../src/components/Navbar/index';
import LoadingScreenComponent from './components/LoadingScreenComponent';
import Settings from '../settings.json';

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: 'InterBold', url: Utils.asset('fonts/Inter_18pt-Bold.ttf') },
      {
        family: 'InterSemiBold',
        url: Utils.asset('fonts/Inter_18pt-SemiBold.ttf'),
      },
      {
        family: 'InterRegular',
        url: Utils.asset('fonts/Inter_18pt-Regular.ttf'),
      },
    ];
  }

  static _template() {
    return {
      ...super._template(),
      Pages: {
        collision: true,
        w: 1920,
        h: 1080,
      },
      Loading: {
        type: LoadingScreenComponent,
      },
      Widgets: {
        Menu: {
          zIndex: 2,
          type: Navbar,
        },
      },
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: Colors('#151515').get(),
        zIndex: -1,
      },
    };
  }

  _setup() {
    Router.startRouter(
      {
        ...routes,
        afterEachRoute: (request) => {
          this.patch({
            Widgets: { Menu: { props: { route: request._hash } } },
          });
        },
      },
      this
    );
  }

  $punchHole() {
    this.tag('Background').shader = {
      color: Colors('#1F2227').get(),
      type: Lightning.shaders.Hole,
      x: 0,
      y: 0,
      w: 1920,
      h: 1080,
    };
  }

  $unpunchHole() {
    this.tag('Background').shader = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
  }
}
