import * as THREE from 'three';
import Book from './objects/book';
import Platform from './objects/platform';

export default class World extends THREE.Group {
  constructor(camera) { 
    super();

    this._camera = camera;
    this._init();
  }

  update(dt) {
    // this.platform.position.z += 0.1;
  }

  _init() { 
    const platform = this.platform = new Platform();
    this.add(platform);

    const book = this.book = new Book();
    this.add(book);
   }
}