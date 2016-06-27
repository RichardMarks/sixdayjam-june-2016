import { Scene } from '../lib/Scene';
import { Keys } from '../lib/Keys';
import { Txt } from '../lib/Txt';

import { gameData } from '../constants';
import {
  giantFont,
  largeFont,
  mediumFont,
  smallFont,
  monoFont,
} from '../ui';

class DeathScene extends Scene {
  constructor() {
    super('Death');
  }

  onEnter() {
    Scene.log('onEnter');
    this._time = 0.0;

    const CENTER_X = this.width * 0.5;
    const CENTER_Y = this.height * 0.5;

    const lines = [
      { text: 'Kyor owns your soul!', font: giantFont, x: CENTER_X, y: CENTER_Y - (CENTER_Y * 0.5) },
      { text: `You have perished!`, font: largeFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.4) },
      { text: `After just ${gameData.steps} steps you collapse lifelessly to the floor.`, font: mediumFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.1) },
      { text: '< Click to Continue >', font: smallFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.8) },
    ];

    lines.forEach(line => {
      const text = new Txt(line.text, line.x, line.y, line.font);
      this.addChild(text);
    });
  }

  onExit() {
    Scene.log('onExit');
  }

  onHide() {
    Scene.log('onHide');
  }

  onShow() {
    Scene.log('onShow');
  }

  onPreUpdate(deltaTime) {
    this._time += deltaTime;
    const input = this.game.input;
    if (input.mouse.down) {
      if (!this._mousedown) {
        this._mousedown = true;
      }
    } else {
      if (this._mousedown) {
        this._mousedown = false;
        this.game.changeScene(this.game.scenes.Title);
      }
    }
  }

  onPreDraw() {
    const ctx = this._screen.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
  }
}

export const deathScene = new DeathScene();
