class GameAudio {
  constructor() {
    this._volume = 100;
    this._track = null;
    this._nextTrack = null;
    this._fading = false;
    this._muted = false;
    this._queue = {};
  }

  fadeOut() {
    if (this._track) {
      return;
    }
    this._fading = true;
    this._volume = 100;
  }

  mute() {
    this._muted = !this._muted;
    if (this._muted) {
      this._track.pause();
      return;
    }
    this._track.play();
  }

  pause() {
    if (this._track) {
      this._track.pause();
    }
  }

  play(id) {
    if (this._muted) {
      return;
    }
    this._queue[id] = true;
  }

  playBGM(id) {
    if (this._track && this._track.currentTime > 0) {
      this._nextTrack = id;
      if (!this._fading) {
        this.fadeOut();
      }
      return;
    }

    this.stopBGM();
    this._track = document.getElementById(id);
    if (this._track.time > 0) {
      this._track.currentTime = 0;
    }
    if (this._muted) {
      return;
    }
    this._track.volume = 1;
    this._track.play();
  }

  resume() {
    if (!this._muted && this._track && this._track.paused) {
      this._track.play();
    }
  }

  stopBGM() {
    if (this._track) {
      this._track.pause();
      this._track.currentTime = 0;
    }
  }

  update() {
    Object.keys(this._queue).forEach(key => {
      const id = this._queue[key];
      const sound = document.getElementById(id);
      sound.pause();
      if (sound.currentTime > 0) {
        sound.currentTime = 0;
      }
      sound.volume = 0.3;
      sound.play();
    });
    this._queue = {};
    if (this._fading) {
      this._volume -= 1;
      if (this._volume > 0) {
        this._track.volume = this._volume * 0.01;
      } else {
        this._fading = false;
        this._track = null;
        if (this._nextTrack) {
          this.playBGM(this._nextTrack);
          this._nextTrack = null;
        }
      }
    }
  }
}

export const gameAudio = new GameAudio();
