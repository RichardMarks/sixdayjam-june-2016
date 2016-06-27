import { exploreScene } from './scenes/explore';
//import { editorScene } from './scenes/editor';
import { victoryScene } from './scenes/victory';
import { titleScene } from './scenes/title';
import { deathScene } from './scenes/death';
import { creditsScene } from './scenes/credits';

import { gameAudio } from './lib/GameAudio';

export function launchGame(gameCanvas) {

  const game = {
    audio: gameAudio,
    input: {
      shift: false,
      keys: [],
      mouse: {
        x: 0,
        y: 0,
        down: false,
      },
    },
    scenes: {},
    screen: {
      canvas: gameCanvas,
      ctx: gameCanvas.getContext('2d'),
    },
    dump() {
      window.console.dirxml(game);
    }
  };

  window.addEventListener('keydown', keyEvent => {
    game.input.keys[keyEvent.keyCode] = true;
    game.input.shift = keyEvent.shiftKey;
  }, false);
  window.addEventListener('keyup', keyEvent => {
    game.input.keys[keyEvent.keyCode] = false;

    if (keyEvent.keyCode === 32) {
      // spacebar to save screenshot
      function screenshot() {
        let dataURL = game.screen.canvas.toDataURL('image/png');
        dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        dataURL = dataURL.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
        this.setAttribute('href', dataURL);
        this.setAttribute('target', '_blank');
        this.setAttribute('download', `screenshot-${Date.now()}.png`);
      };
      const anchor = document.createElement('a');
      anchor.addEventListener('click', screenshot, false);
      anchor.click();
    }
  }, false);

  game.screen.canvas.addEventListener('mousedown', mouseEvent => {
    const rect = game.screen.canvas.getBoundingClientRect();
    game.input.mouse.x = mouseEvent.clientX - rect.left;
    game.input.mouse.y = mouseEvent.clientY - rect.top;
    game.input.mouse.down = true;
    game.input.mouse.mods = {
      alt: mouseEvent.altKey,
      ctrl: mouseEvent.ctrlKey,
      shift: mouseEvent.shiftKey,
    };
  }, false);

  game.screen.canvas.addEventListener('mouseup', mouseEvent => {
    const rect = game.screen.canvas.getBoundingClientRect();
    game.input.mouse.x = mouseEvent.clientX - rect.left;
    game.input.mouse.y = mouseEvent.clientY - rect.top;
    game.input.mouse.down = false;
    game.input.mouse.mods = {
      alt: mouseEvent.altKey,
      ctrl: mouseEvent.ctrlKey,
      shift: mouseEvent.shiftKey,
    };
  }, false);

  game.screen.canvas.addEventListener('mousemove', mouseEvent => {
    const rect = game.screen.canvas.getBoundingClientRect();
    game.input.mouse.x = mouseEvent.clientX - rect.left;
    game.input.mouse.y = mouseEvent.clientY - rect.top;
    game.input.mouse.mods = {
      alt: mouseEvent.altKey,
      ctrl: mouseEvent.ctrlKey,
      shift: mouseEvent.shiftKey,
    };
  }, false);

  game.registerScene = function (scene) {
    game.scenes[scene.name] = scene;
  };

  game.changeScene = function (scene) {
    if (game.currentScene === scene) {
      return;
    }
    game.nextScene = scene;
    game.fading = true;
    game.fadeIn = true;
    game.fadeValue = 0.0;
    // if (game.currentScene) {
    //   game.currentScene.exit();
    // }
    // game.currentScene = scene;
    // scene.game = game;
    // scene.enter();
  };

  game.loadScene = function (scene) {
    game.nextScene = null;
    if (game.currentScene) {
      game.currentScene.exit();
    }
    game.currentScene = scene;
    scene.game = game;
    scene.enter();
  };

  game.registerScene(titleScene);
  game.registerScene(deathScene);
  game.registerScene(creditsScene);
  game.registerScene(victoryScene);
  game.registerScene(exploreScene);
  //game.registerScene(editorScene);

  game.loadScene(titleScene);


  setInterval(function heartBeat() {
    gameAudio.update();
    const scene = game.currentScene;
    scene.update(0.33);
    scene.draw();
    if (game.fading) {
      const ctx = game.screen.ctx;
      ctx.save();
      ctx.globalAlpha = game.fadeValue;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (game.fadeIn) {
        game.fadeValue += 0.06;
        if (game.fadeValue > 1.0) {
          game.fadeValue = 1.0;
          game.fading = false;
          game.fadeOutComplete = true;
        }
      } else {
        game.fadeValue -= 0.06;
        if (game.fadeValue < 0.0) {
          game.fadeValue = 0.0;
          game.fading = false;
          game.fadeInComplete = true;
        }
      }

      if (game.fadeOutComplete) {
        game.fadeOutComplete = false;
        game.loadScene(game.nextScene);
      } else if (game.fadeInComplete) {
        game.fading = true;
        game.fadeOut = true;
        game.fadeValue = 1.0;
      }

      ctx.restore();
    }
  }, 33);

  window.$debug = { game };

}
