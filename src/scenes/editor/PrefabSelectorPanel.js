import { drawPrefab } from './common';

export class PrefabSelectorPanel {
  constructor(prefabs) {
    this._prefabs = prefabs;
    this._selectedIndex = 0;
    this._bounds = { x: 410, y: 24, width: prefabs.length * 32, height: 32 };
    this._bounds.left = this._bounds.x;
    this._bounds.top = this._bounds.y;
    this._bounds.right = this._bounds.x + this._bounds.width;
    this._bounds.bottom = this._bounds.y + this._bounds.height;
    this._prefabWidth = (this._bounds.width / prefabs.length) | 0;
    this._blockWidth = ((this._prefabWidth - 1) / 3) | 0;
    this._blockHeight = ((this._prefabWidth - 1) / 3) | 0;

    this.onSelect = null;
  }

  get bounds() { return this._bounds; }

  draw(ctx) {
    ctx.save();
    ctx.translate(this._bounds.x, this._bounds.y);
    const prefabs = this._prefabs;
    const count = prefabs.length;
    const prefabWidth = this._prefabWidth;
    for (let i = 0; i < count; i += 1) {
      const x = i * prefabWidth;
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(`${i}`, x + (prefabWidth * 0.5), this._bounds.top - 44);
      drawPrefab(prefabs[i], ctx, x + 2, 0, prefabWidth - 4, prefabWidth - 4, this._blockWidth, this._blockHeight);
    }
    ctx.save();
    ctx.translate(prefabWidth * 0.5 + (prefabWidth * this._selectedIndex), prefabWidth);
    ctx.beginPath();
    ctx.fillStyle = 'white';
    const sz = 8;
    ctx.moveTo(0, 0);
    ctx.lineTo(-sz, sz);
    ctx.lineTo(sz, sz);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  onClick(x, y) {
    // window.console.warn(`Prefab Selector Panel Clicked @ ${x}, ${y}`);
    const index = ((x - this._bounds.x) / this._prefabWidth) | 0;
    this._selectedIndex = index;
    this.onSelect && this.onSelect({ prefab: this._prefabs[index], index });
  }
}
