import { Graphic } from '../Graphic';

export class StaticImageGraphic extends Graphic {
  constructor(image, x, y, clip) {
    super(x, y);
    this._image = image;
    this._width = image.width;
    this._height = image.height;
    if (clip) {
      this._clip = clip;
      this._clipped = true;
    }
  }
  get width() { return this._width; }
  get height() { return this._height; }
  set width(w) { this._width = w; }
  set height(h) { this._height = h; }
  get image() { return this._image; }
  set image(i) {
    this._image = i;
    this._width = i.width;
    this._height = i.height;
  }
  get clip() { return this._clip; }
  set clip(c) {
    this._clip = c;
    if (c) {
      this._clipped = true;
    } else {
      this._clipped = false;
    }
  }
  set clipX(x) { this._clip.x = x; this._clipped = true; }
  set clipY(x) { this._clip.y = x; this._clipped = true; }
  set clipWidth(x) { this._clip.width = x; this._clipped = true; }
  set clipHeight(x) { this._clip.height = x; this._clipped = true; }

  draw(ctx) {
    if (this.visible) {
      ctx.save();
      if (this.alpha !== 1.0) {
        ctx.globalAlpha = this.alpha;
      }
      if (this._clipped) {
        ctx.drawImage(this._image, this._clip.x, this._clip.y, this._clip.width, this._clip.height, this.x, this.y, this._width, this._height);
      } else {
        ctx.drawImage(this._image, 0, 0, this._image.width, this._image.height, this.x, this.y, this._width, this._height);
      }
      ctx.restore();
    }
  }
}
