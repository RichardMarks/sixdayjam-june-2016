import { Scene } from '../lib/Scene';
import { Keys } from '../lib/Keys';
import { Txt } from '../lib/Txt';

import { MapPanel } from './editor/MapPanel';
import { PrefabSelectorPanel } from './editor/PrefabSelectorPanel';

class EditorScene extends Scene {
  constructor() {
    super('Editor');
  }

  onEnter() {
    Scene.log('onEnter');
    this._time = 0.0;
    this._label = new Txt(`Click to Select + Place Prefab, Alt + Click to Remove Prefab`, this.width * 0.5, this.height - 32, { font: 'monospace', size: 24, color: 'white', align: 'center' });
    this.addChild(this._label);

    this._currentPrefabId = -1;
    this._prefabs = [
      'wswwswwsw',
      'wswwsswsw',
      'wswsswwsw',
      'wwwwsswsw',
      'wwwsswwsw',
      'wswssswsw',
      'wwwwswwsw',
      'wwwssswsw',
      // alternates
      'wwwssswww',
      'wswwsswww',
      'wswsswwww',
      'wswwswwww',
      'wwwsswwww',
      'wwwwsswww',
      'wswssswww',
    ];

    this._mapPanel = new MapPanel();
    this._mapPanel._data.length = 0;
    this._mapPanel._renderData.length = 0;
    window.currentLevel.data.forEach(d => {
      this._mapPanel._data.push(d);
      this._mapPanel._renderData.push(this._prefabs[d]);
    });
    this._prefabSelectorPanel = new PrefabSelectorPanel(this._prefabs);
    this._prefabSelectorPanel.onSelect = this._onPrefabSelect.bind(this);

    this._dataTxt = document.createElement('textarea');
    this._dataTxt.setAttribute('rows', '10');
    this._dataTxt.setAttribute('cols', '30');
    document.body.appendChild(this._dataTxt);
    Object.assign(this._dataTxt.style, {
      position: 'absolute',
      top: `${this._prefabSelectorPanel.bounds.bottom + 64}px`,
      left: '420px',
      fontFamily: 'monospace',
      fontSize: '1.5em',
    });
    this._dataTxt.innerText = JSON.stringify(this._mapPanel._data);

    this.selectNextPrefab();
  }

  get currentPrefab() {
    return this._prefabs[this._currentPrefabId];
  }

  selectNextPrefab() {
    this._currentPrefabId += 1;
    this._currentPrefabId >= this._prefabs.length && (this._currentPrefabId = 0);
    this._mapPanel.prefab = this.currentPrefab;
    this._mapPanel.prefabId = this._currentPrefabId;
  }

  selectPreviousPrefab() {
    this._currentPrefabId -= 1;
    this._currentPrefabId < 0 && (this._currentPrefabId = this._prefabs.length - 1);
    this._mapPanel.prefab = this.currentPrefab;
    this._mapPanel.prefabId = this._currentPrefabId;
  }

  onExit() {
    Scene.log('onExit');
    document.body.removeChild(this._dataTxt);
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
        this._onClick(input.mouse.x, input.mouse.y);
      }
    }

    const keys = input.keys;

    if (keys[Keys.E]) {
      if (!this._editorKey) {
        this._editorKey = true;
      }
    } else {
      if (this._editorKey) {
        this._editorKey = false;
        this.game.changeScene(this.game.scenes.Explore);
      }
    }
  }

  onPreDraw() {
    const ctx = this._screen.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    this._mapPanel.draw(ctx);
    this._prefabSelectorPanel.draw(ctx);
  }

  _onClick(x, y) {
    // window.console.warn(`Mouse Click @ ${x}, ${y}`);
    const mapPanelBounds = this._mapPanel.bounds;
    if (x >= mapPanelBounds.left && x <= mapPanelBounds.right && y >= mapPanelBounds.top && y <= mapPanelBounds.bottom) {
      this._mapPanel.onClick(x, y, this.game.input.mouse.mods);
      this._dataTxt.innerText = JSON.stringify(this._mapPanel._data);
    }

    const selectorBounds = this._prefabSelectorPanel.bounds;
    if (x >= selectorBounds.left && x <= selectorBounds.right && y >= selectorBounds.top && y <= selectorBounds.bottom) {
      this._prefabSelectorPanel.onClick(x, y);
    }
  }

  _onPrefabSelect(selection) {
    this._currentPrefabId = selection.index;
    this._mapPanel.prefab = selection.prefab;
    this._mapPanel.prefabId = selection.index;
  }
}

export const editorScene = new EditorScene();
