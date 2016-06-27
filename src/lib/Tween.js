export class Tween {
  static get SINGLE() { return 0; }
  static get REPEAT() { return 1; }
  static get PERSIST() { return 2; }
  constructor({ duration, type, onComplete, ease }) {
    this._active = false;
    this._onComplete = onComplete;
    this._target = duration;
    this._type = type;
    this._ease = ease;
    this._time = 0;
    this._t = 0;
    this._finish = false;
  }

  update(deltaTime) {
    this._time += deltaTime;
    this._t = this._time / this._target;
    if (this._ease && this._t > 0 && this._t < 1) {
      this._t = this._ease(this._t);
    }
    if (this._time >= this._target) {
      this._t = 1;
      this._finish = true;
    }
  }

  start() {
    this._time = 0;
    if (this._target === 0) {
      this._active = false;
      return;
    }
    this._active = true;
  }

  stop() {
    this._t = 1;
    this._finish = true;
    this._active = false;
  }

  pause() {
    this._active = false;
  }

  resume() {
    this._active = true;
  }

  finish() {
    if (this._type === Tween.PERSIST) {
      this._time = this._target;
      this._active = false;
    } else if (this._type === Tween.REPEAT) {
      this._time = this._time % this._target;
      this._t = this._time / this._target;
      if (this._ease && this._t > 0 && this._t < 1) {
        this._t = this._ease(this._t);
      }
      this.start();
    } else if (this._type === Tween.SINGLE) {
      this._time = this._target;
      this._active = false;
    }
    this._finish = false;
    this._onComplete && this._onComplete();
  }
}

export class ValueTween extends Tween {
  constructor({ duration, type, onComplete }) {
    super({ duration: 0, type, onComplete });
  }

  tween({ fromValue, toValue, duration, ease }) {
    this._start = this.value = fromValue;
    this._range = toValue - this.value;
    this._target = duration;
    this._ease = ease;
    this.start();
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.value = this._start + this._range * this._t;
  }
}
