import { Black } from 'black-engine';
import * as THREE from 'three';
import GLOBAL_CONFIG from '../config';
import CameraController from './camera-controller';
import Book from './objects/book';
import Platform from './objects/platform';
import PlayerController from './player-controller';
import WORLD_CONFIG from './world-config';

export default class World extends THREE.Group {
  constructor(camera) { 
    super();

    this._camera = camera;
    this._init();
  }

  update(dt) {
    // this.platform.position.z += 0.1;
    if(!GLOBAL_CONFIG.orbitControls) {
      this.cameraController.update();
    }

    this.playerController.update(dt);
  }

  _init() { 
    const platform = this.platform = new Platform();
    this.add(platform);

    const book = this.book = new Book();
    this.add(book);

    book.position.set(0, 0, 1);
    this.cameraController = new CameraController(book, this._camera);
    this.playerController = new PlayerController(book);
   }
}