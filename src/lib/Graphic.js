export class Graphic {
  constructor(x, y) {
    this._visible = true;
    this.x = x;
    this.y = y;
    this.alpha = 1.0;
  }

  get visible() { return this._visible; }
  set visible(v) { this._visible = v; }

  draw(ctx) {}
}
