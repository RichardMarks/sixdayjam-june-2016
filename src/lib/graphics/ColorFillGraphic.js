import { Graphic } from '../Graphic';

export class ColorFillGraphic extends Graphic {
  constructor(color, x, y, width, height) {
    super(x, y);
    this._color = color;
    this._width = width;
    this._height = height;
  }
  get fill() { return this._color; }
  set fill(c) { this._color = c; }
  get width() { return this._width; }
  get height() { return this._height; }
  set width(w) { this._width = w; }
  set height(h) { this._height = h; }

  draw(ctx) {
    if (this.visible) {
      ctx.save();
      if (this.alpha !== 1.0) {
        ctx.globalAlpha = this.alpha;
      }
      ctx.fillStyle = this._color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }
}
