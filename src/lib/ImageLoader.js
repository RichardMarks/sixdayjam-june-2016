export class ImageLoader {

  static create({root}) { return new ImageLoader(root); }

  constructor(imagesRoot) {
    this._images = {};
    this._imagesRoot = imagesRoot || 'img';
  }

  get images() { return this._images; }

  load(manifest) {
    if (!manifest || Object.keys(manifest).length === 0) {
      return Promise.reject('No images to load');
    }
    const keys = Object.keys(manifest);
    const count = keys.length;
    let loaded = 0;
    return new Promise((resolve, reject) => {
      keys.forEach(key => {
        const pathOrUrl = `${this._imagesRoot}/${manifest[key]}`;
        const image = new Image();
        image.onerror = () => { reject(`Unable to load ${pathOrUrl}`); };
        image.onload = () => {
          this._images[key] = image;
          loaded += 1;
          if (loaded >= count) {
            resolve(this._images);
          }
        };
        image.src = pathOrUrl;
      });
    });
  }
}
