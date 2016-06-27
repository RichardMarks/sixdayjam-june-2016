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

class TitleScene extends Scene {
  constructor() {
    super('Title');
  }

  onEnter() {
    Scene.log('onEnter');
    this._time = 0.0;

    this.game.audio.playBGM('bgm0');

    const CENTER_X = this.width * 0.5;
    const CENTER_Y = this.height * 0.5;

    const lines = [
      { text: 'Walled In', font: giantFont, x: CENTER_X, y: CENTER_Y - (CENTER_Y * 0.5) },
      { text: ':: A short adventure set in the Dungeons of Kyor ::', font: mediumFont, x: CENTER_X, y: CENTER_Y - (CENTER_Y * 0.2) },
      { text: '#sixdayjam June 2016 Entry Edition', font: smallFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.1) },
      { text: '< Click to Play >', font: smallFont, x: CENTER_X, y: CENTER_Y + (CENTER_Y * 0.5) },
    ];

    lines.forEach(line => {
      const text = new Txt(line.text, line.x, line.y, line.font);
      line.ref = text;
      this.addChild(text);
    });

    this._ctp = lines[3].ref;
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

    if (this._time > 5) {
      this._time = 0;
      if (this._ctp.show) {
        this._ctp.graphic.alpha = 1.0;
        this._ctp.show = false;
      } else {
        this._ctp.graphic.alpha = 0.3;
        this._ctp.show = true;
      }
    }

    const input = this.game.input;
    if (input.mouse.down) {
      if (!this._mousedown) {
        this._mousedown = true;
      }
    } else {
      if (this._mousedown) {
        this._mousedown = false;
        gameData.vitality = gameData.maxVitality;
        gameData.steps = 0;
        this.game.changeScene(this.game.scenes.Explore);
      }
    }
  }

  onPreDraw() {
    const ctx = this._screen.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

  }
}

export const titleScene = new TitleScene();
