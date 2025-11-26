import { Launch } from '@lightningjs/sdk';
import App from './App.js';
import Settings from '../settings.json';
const { appSettings, platformSettings } = Settings;
const app = Launch(App, appSettings, platformSettings);
const canvas = app.stage.getCanvas();
document.body.appendChild(canvas);
