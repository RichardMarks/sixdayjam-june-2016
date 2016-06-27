import { Scene } from '../lib/Scene';
import { Keys } from '../lib/Keys';
import { Txt } from '../lib/Txt';

import { drawScene, drawCurrentRoomPlan } from './explore/';

import { renderScene, setRenderTarget } from './explore/render';
import { renderMinimap, seen, see } from './explore/minimap';

import { level1 } from '../levels/level1';

import { gameData } from '../constants';

const dungeonSceneData = [
  0x887,
  0x2387,
  0x1837,
  0x24b,
  0x42b,
  0x3337,
  0x44b,
  0x22b,
];

// mapToPrefabTranslator[map[position]][player.direction] = renderPrefabId

// stand in player entity
const player = {
  x: 0,
  y: 0,
  direction: 0,
  seen: [],
};

class ExploreScene extends Scene {
  constructor() {
    super('Explore');
  }

  onEnter() {
    Scene.log('onEnter');
    this._time = 0.0;

    setRenderTarget(this._screen.ctx);

    this._dungeonSceneId = 0;
    this._hud = new Txt(`Vitality ${gameData.vitality}`, this.width - 24, 24, { font: 'fantasy', size: 24, color: 'white', align: 'right' });
    this.addChild(this._hud);
    this._loadLevel(level1);

    const widthOver3 = 24 + ((this.width * 0.5)) / 3;

    this._sections = [
      widthOver3,
      widthOver3 * 2,
    ];
  }

  _loadLevel(level) {
    const { name, width, height, data, translate, start, portal } = level;
    window.currentLevel = level;

    player.x = start.x;
    player.y = start.y;
    player.direction = start.direction;
    this._map = { data, width, height };
    this._translator = translate;
    this._portal = portal;

    see(player, start.x, start.y);

    this._selectPrefab(player.x, player.y, player.direction);
  }

  _selectPrefab(x, y, direction) {
    see(player, x, y);
    const mapId = this._map.data[x + (y * this._map.width)];
    const prefabId = this._translator[mapId][direction];
    this._dungeonSceneId = prefabId;
    return prefabId;
  }

  // if (this._isExit(player.direction))
  _isExit(direction) {

    const mapId = this._map.data[player.x + (player.y * this._map.width)];
    const currentScene = dungeonSceneData[this._translator[mapId][direction]];
    return currentScene & 4;

    if (direction === 0) {
      // north
      window.console.warn(`Try to test north exit: ${currentScene & 4}`);
      return currentScene & 4;
    } else if (direction === 1) {
      // east
      window.console.warn(`Try to test east exit: ${!(currentScene & 1024 || currentScene & 2048)}`);
      return !(currentScene & 1024 || currentScene & 2048);
    } else if (direction === 2) {
      // south
      return true;
    } else {
      // west
      window.console.warn(`Try to test west exit: ${!(currentScene & 64 || currentScene & 128)}`);
      debugger;
      return !(currentScene & 64 || currentScene & 128);
    }
  }

  _navigationControls(keys) {
    if (keys[Keys.UP] || keys[Keys.W]) {
      if (!this._navForwardKey) {
        this._navForwardKey = true;
      }
    } else {
      if (this._navForwardKey) {
        this._navForwardKey = false;
        this._moveForward();
      }
    }

    if (keys[Keys.LEFT] || keys[Keys.A]) {
      if (!this._navTurnLeft) {
        this._navTurnLeft = true;
      }

    } else {
      if (this._navTurnLeft) {
        this._navTurnLeft = false;
        this._turnLeft();
      }
    }

    if (keys[Keys.RIGHT] || keys[Keys.D]) {
      if (!this._navTurnRight) {
        this._navTurnRight = true;
      }
    } else {
      if (this._navTurnRight) {
        this._navTurnRight = false;
        this._turnRight();
      }
    }
  }

  _moveForward() {
    let moved = true;
    [
      () => {
        // north
        this._isExit(player.direction) && player.y > 0 && (player.y -= 1);
      },
      () => {
        // east
        this._isExit(player.direction) && player.x < this._map.width - 1 && (player.x += 1);
      },
      () => {
        // south
        this._isExit(player.direction) && player.y < this._map.height - 1 && (player.y += 1);
      },
      () => {
        // west
        this._isExit(player.direction) && player.x > 0 && (player.x -= 1);
      },
    ][player.direction]();
    if (moved) {
      gameData.steps += 1;
      this.loseVitality(5);
      this._selectPrefab(player.x, player.y, player.direction);
    }
  }

  loseVitality(amount) {
    gameData.vitality -= amount;
    if (gameData.vitality < 0) {
      gameData.vitality = 0;
    }
    this._hud.graphic.text = `Vitality ${gameData.vitality}`;
    if (gameData.vitality === 0) {
      setTimeout(this._gameover.bind(this, false), 500);
    }
  }

  _gameover(win) {
    this.game.changeScene(win ? this.game.scenes.Victory : this.game.scenes.Death);
  }

  _moveBackward() {

  }

  _turnLeft() {
    player.direction -= 1;
    player.direction < 0 && (player.direction = 3);
    this._selectPrefab(player.x, player.y, player.direction);
  }

  _turnRight() {
    player.direction += 1;
    player.direction > 3 && (player.direction = 0);
    this._selectPrefab(player.x, player.y, player.direction);
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
    if (this.game.input.mouse.down) {
      if (!this._mousedown) {
        this._mousedown = true;
      }
    } else {
      if (this._mousedown) {
        this._mousedown = false;
        if (player.win) {
          setTimeout(this._gameover.bind(this, true), 500);
        } else {
          // mouse nav
          if (this.game.input.mouse.x < this._sections[0]) {
            this._turnLeft();
          } else if (this.game.input.mouse.x > this._sections[1]) {
            this._turnRight();
          } else {
            this._moveForward();
          }
        }
      }
    }

    // const keys = this.game.input.keys;
    // this._navigationControls(keys);

    // if (keys[Keys.E]) {
    //   if (!this._editorKey) {
    //     this._editorKey = true;
    //   }
    // } else {
    //   if (this._editorKey) {
    //     this._editorKey = false;
    //     this.game.changeScene(this.game.scenes.Editor);
    //   }
    // }
  }

  onPreDraw() {
    const ctx = this._screen.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#444';
    ctx.strokeStyle = 'white';

    let sceneData = dungeonSceneData[this._dungeonSceneId];
    player.win = false;
    if (player.x === this._portal.x && player.y === this._portal.y && player.direction === this._portal.direction) {
      sceneData |= 0x8000;
      player.win = true;
    }
    renderScene(sceneData);
    renderMinimap(ctx, this._map, player);
  }
}

export const exploreScene = new ExploreScene();
