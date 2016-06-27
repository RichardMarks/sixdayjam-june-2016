import { Graphic } from '../Graphic';

export class TextGraphic extends Graphic {
  constructor(text, x, y, {font, size, color, align}) {
    super(x, y);
    this._text = text;
    this._fill = color || 'white';
    this._font = font || 'monospace';
    this._size = size || 16;
    this._fontDef = `${size}px ${font}`;
    this._align = align;
  }
  get text() { return this._text; }
  get font() { return this._font; }
  get size() { return this._size; }
  set text(t) { this._text = t; }
  get fill() { return this._fill; }
  set fill(f) { this._fill = f; }

  draw(ctx) {
    if (this.visible) {
      ctx.save();
      if (this.alpha !== 1.0) {
        ctx.globalAlpha = this.alpha;
      }
      ctx.font = this._fontDef;
      ctx.textBaseline = 'top';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = this._fill;
      ctx.textAlign = this._align;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.strokeText(this._text, this.x | 0, this.y | 0);
      ctx.fillText(this._text, this.x | 0, this.y | 0);
      ctx.restore();
    }
  }
}
