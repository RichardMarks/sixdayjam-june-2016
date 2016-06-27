let currentScene = null;
export class Scene {
  static log(what) { window.console.log(`Scene[${currentScene && currentScene.name}].log: ${what}`); }
  constructor(name) {
    this.name = name;

    this._visible = true;
    this._active = true;
    this._children = [];
  }

  set game($game) {
    this._game = $game;
    this._screen = $game.screen;
    this._width = $game.screen.canvas.width;
    this._height = $game.screen.canvas.height;
  }

  get width() { return this._width; }
  get height() { return this._height; }
  get screen() { return this._screen; }
  get game() { return this._game; }
  get visible() { return this._visible; }
  get active() { return this._active; }

  get children() { return this._children.slice(); }

  addChild(child) {
    child.scene = this;
    child.game = this.game;
    this._children.push(child);
    child.onAdded && child.onAdded();
  }

  addChildAt(child, index) {
    child.scene = this;
    child.game = this.game;
    if (index === 0) {
      this._children.unshift(child);
    } else if (index === this._children.length) {
      this._children.push(child);
    } else {
      this._children.splice(index, 0, child);
    }
    child.onAdded && child.onAdded();
  }

  removeChild(child) {
    if (child.scene === this) {
      this._children.splice(this._children.indexOf(child), 1);
      child.onRemoved && child.onRemoved();
      child.scene = null;
      child.game = null;
    }
  }

  removeChildAt(index) {
    let child;
    if (index === 0) {
      child = this._children.shift();
    } else if (index === this._children.length - 1) {
      child = this._children.pop();
    } else {
      child = this._children.splice(index, 1);
      if (child.length) { child = child[0]; }
    }
    child.onRemoved && child.onRemoved();
    child.scene = null;
    child.game = null;
  }

  addChildren(...children) {
    children.forEach(child => this.addChild(child));
  }

  removeAllChildren() {
    while (this._children.length) {
      const child = this._children.pop();
      child.onRemoved && child.onRemoved();
      child.scene = null;
      child.game = null;
    }
    this._children.length = 0;
  }

  enter() {
    currentScene = this;
    window.scene = this;
    this._active = true;
    this.onEnter();
  }

  exit() {
    this._active = false;
    this.onExit();
  }

  show() {
    this._visible = true;
    this.onShow();
  }

  hide() {
    this._visible = false;
    this.onHide();
  }

  update(deltaTime) {
    this.onPreUpdate(deltaTime);
    if (this.active) {
      this._children.forEach(child => {
        child.update && child.update(deltaTime);
      });
    }
    this.onPostUpdate(deltaTime);
  }

  draw() {
    this.onPreDraw();
    if (this.visible) {
      this._children.forEach(child => {
        child.draw && child.draw(this._screen.ctx);
      });
    }
    this.onPostDraw();
  }


  // callbacks
  onEnter() {}
  onExit() {}
  onHide() {}
  onShow() {}
  onPreUpdate(deltaTime) {}
  onPostUpdate(deltaTime) {}
  onPreDraw() {}
  onPostDraw() {}
}
