import { drawPrefab } from './common';

export class MapPanel {
  constructor() {
    this._bounds = { x: 4, y: 4, width: 400, height: 400 };
    this._bounds.left = 4;
    this._bounds.top = 4;
    this._bounds.right = 404;
    this._bounds.bottom = 404;
    this._width = 8;
    this._height = 8;
    this._rowHeight = (this._bounds.height / this._height) | 0;
    this._colWidth  = (this._bounds.width / this._width) | 0;

    this._blockWidth = ((this._colWidth - 4) / 3) | 0;
    this._blockHeight = ((this._rowHeight - 4) / 3) | 0;

    this._data = [];
    this._renderData = [];
    this._currentPrefab = null;
    this._currentPrefabId = 0;
  }

  get prefab() { return this._currentPrefab; }
  set prefab(p) { this._currentPrefab = p; }

  get prefabId() { return this._currentPrefabId; }
  set prefabId(p) { this._currentPrefabId = p; }

  get bounds() { return this._bounds; }

  draw(ctx) {
    ctx.save();
    ctx.translate(this._bounds.x, this._bounds.y);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.strokeRect(0, 0, this._bounds.width, this._bounds.height);
    const rows = this._height;
    const cols = this._width;
    const rowHeight = this._rowHeight;
    const colWidth = this._colWidth;
    const line = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    for (let y = 0; y < rows; y += 1) {
      line(0, y * rowHeight, this._bounds.width, y * rowHeight);
    }
    for (let x = 0; x < cols; x += 1) {
      line(x * colWidth, 0, x * colWidth, this._bounds.height);
    }
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const pos = x + y * this._width;
        const prefab = this._renderData[pos];
        if (prefab) {
          drawPrefab(prefab, ctx, (x * colWidth) + 2, (y * rowHeight) + 2, colWidth - 4, rowHeight - 4, this._blockWidth, this._blockHeight);
        }
      }
    }
    ctx.restore();
  }

  onClick(x, y, mods) {
    // window.console.warn(`Map Panel Clicked @ ${x}, ${y}`);
    const rowHeight = this._rowHeight;
    const colWidth = this._colWidth;
    const mx = (x / colWidth) | 0;
    const my = (y / rowHeight) | 0;
    // console.log(`row ${my} column ${mx}`);

    const data = this._data;
    const renderData = this._renderData;
    const pos = mx + my * this._width;

    if (mods.alt) {
      data[pos] = null;
      renderData[pos] = null;
    } else {
      renderData[pos] = this._currentPrefab;
      data[pos] = this._currentPrefabId;
    }
  }

  _drawPrefab(data, ctx, ax, ay, width, height) {
    ctx.save();
    ctx.translate(ax, ay);
    const blockWidth = this._blockWidth;
    const blockHeight = this._blockHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    data.split('').forEach((id, index) => {
      if (id === 'w') {
        const x = (index % 3) | 0;
        const y = (index / 3) | 0;
        ctx.fillRect(2 + (x * blockWidth), 2 + (y * blockHeight), blockWidth - 4, blockHeight - 4);
      }
    });
    ctx.restore();
  }
}
