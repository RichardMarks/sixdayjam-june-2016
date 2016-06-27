
export class Actor {
  constructor(x, y, graphic) {
    this.x = x;
    this.y = y;
    this._graphic = graphic;
    this._time = 0;
    this._visible = true;
    this._active = true;
    if (graphic) {
      this._width = graphic.width || 0;
      this._height = graphic.height || 0;
    }
  }
  get visible() { return this._visible; }
  set visible(v) {
    this._visible = v;
    if (this._graphic) {
      this._graphic.visible = v;
    }
  }

  get width() { return this._width; }
  get height() { return this._height; }

  get graphic() { return this._graphic; }
  set graphic(g) { this._graphic = g; }
  get time() { return this._time; }

  resetTime() { this._time = 0; }

  update(deltaTime) {
    if (this._active) {
      this._time += deltaTime;
    }
  }

  draw(ctx) {
    if (this._graphic) {
      this._graphic.x = this.x;
      this._graphic.y = this.y;
      this._graphic.draw(ctx);
    }
  }

  // callbacks
  onAdded() {}
  onRemoved() {}
}
