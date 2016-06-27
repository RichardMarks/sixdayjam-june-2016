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

class VictoryScene extends Scene {
  constructor() {
    super('Victory');
  }

  onEnter() {
    Scene.log('onEnter');
    this._time = 0.0;

    const CENTER_X = this.width * 0.5;
    const CENTER_Y = this.height * 0.5;

    const lines = [
      { text: 'You Escaped Kyor!', font: giantFont, x: CENTER_X, y: CENTER_Y - (CENTER_Y * 0.5) },
      { text: `with ${gameData.vitality} / ${gameData.maxVitality} vitality remaining`, font: largeFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.4) },
      { text: `You walked ${gameData.steps} steps to escape`, font: mediumFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.1) },
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
        this.game.changeScene(this.game.scenes.Credits);
      }
    }
  }

  onPreDraw() {
    const ctx = this._screen.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

  }
}

export const victoryScene = new VictoryScene();
