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

class CreditsScene extends Scene {
  constructor() {
    super('Credits');
  }

  onEnter() {
    Scene.log('onEnter');
    this._time = 0.0;

    const title = (text) => { return { text, font: giantFont }; };
    const header = (text) => { return { text, font: largeFont }; };
    const name = (text) => { return { text, font: mediumFont }; };
    const matter = (text) => { return { text, font: smallFont }; };
    const skip = (count, font) => { return { skip: count, font }; };

    const ending = (text) => { return { text, font: giantFont, ending: true }; };

    const lines = [
      title('Walled In'),
      name(':: A short adventure set in the Dungeons of Kyor ::'),
      skip(3, mediumFont),
      header('Design'), name('Richard Marks'), skip(2, smallFont),
      header('Programming'), name('Richard Marks'), skip(2, smallFont),
      header('Art'), name('Richard Marks'), skip(2, smallFont),
      header('Audio'), name('Richard Marks'), skip(2, mediumFont),
      header('Special Thanks'),
      name('Rachel Marks'),
      name('GOD'),
      skip(4, smallFont),
      header('Thank you for playing!'),
      skip(4, mediumFont),
      matter('© Copyright 2016, Richard Marks'),
      skip(4, mediumFont),
      ending(':: END ::'),
    ];

    this._addLines(lines);
  }

  _addLines(lines) {
    this._credits = [];
    this._creditsSpeed = 4.8;
    this._offscreen = 0;
    const beginY = this.height;
    let nextY = beginY;
    const CENTER_X = this.width * 0.5;
    lines.forEach(line => {
      if (line.skip) {
        nextY += line.skip * line.font.size;
      } else {
        const text = new Txt(line.text, CENTER_X, nextY, line.font);
        if (line.ending) {
          text.isEnding = true;
        }
        this.addChild(text);
        this._credits.push(text);
        nextY += (line.font.size) + 4;
      }
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

    this._credits.forEach(credit => {
      if (credit.isEnding) {
        if (credit.y > this.height * 0.5) {
          credit.y -= this._creditsSpeed * deltaTime;
        } else {
          credit.y = this.height * 0.5;
          if (!credit.offscreen) {
            credit.offscreen = true;
            this._offscreen += 1;
          }
        }
      } else {
        credit.y -= this._creditsSpeed * deltaTime;
        if (credit.y < 0 && !credit.offscreen) {
          credit.offscreen = true;
          this._offscreen += 1;
        }
      }
    });

    if (this._offscreen >= this._credits.length) {
      setTimeout(() => {
        this.game.changeScene(this.game.scenes.Title);
      }, 2500);
    }
  }

  onPreDraw() {
    const ctx = this._screen.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
  }
}

export const creditsScene = new CreditsScene();
