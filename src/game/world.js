import { Black, MessageDispatcher } from 'black-engine';
import * as THREE from 'three';
import { MathUtils } from "three";
import GLOBAL_CONFIG from '../config';
import CameraController from './camera-controller';
import GATES_CONFIG from './data/gates-config';
import Book from './objects/book';
import Gates from './objects/gates';
import Platform from './objects/platform';
import PlayerController from './player-controller';
import ScreenShake from './utils/screen-shake';
import WORLD_CONFIG from './world-config';

export default class World extends THREE.Group {
  constructor(camera) { 
    super();
    this.events = new MessageDispatcher();

    this._camera = camera;
    this._gatesPool = [];

    this._screenShake = ScreenShake(this._camera);
    this._isShaking = false;
    this._isPause = true;

    this._init();
  }

  start() {
    this._isPause = false;
  }

  update(dt) {
    if(this._isPause) {
      return
    }

    if(!GLOBAL_CONFIG.orbitControls) {
      this._cameraController.update();
    }
    
    if(this._isShaking) {
      this._screenShake.update();
    } else {
      this._playerController.update(dt);
    }
  }

  _init() { 
    this._initPlatform();
    this._initBook();
    this._initGates();

    Black.input.once('pointerDown', () => {
      this.start();
    });

    this._cameraController = new CameraController(this._book, this._camera);
    this._cameraController.setStartPosition();

    this._playerController = new PlayerController(this._book, this._gatesPool);
    this._playerController.events.on('onCollideGates', (msg, isCorrect) => this._onCollideGates(isCorrect));
  }

  _initPlatform() {
    const platform = this.platform = new Platform();
    this.add(platform);
  }

  _initBook() {
    const book = this._book = new Book();
    this.add(book);

    book.position.set(0, 0, 1);
  }

  _initGates() {
    const leftX = WORLD_CONFIG.platfotmWidth * 0.25;
    const rightX = -WORLD_CONFIG.platfotmWidth * 0.25;

    GATES_CONFIG.forEach(gatesData => {
      const isCorrectLeft = Math.random() > 0.5;

      const leftGates = new Gates(isCorrectLeft ? gatesData.correctAnswer : gatesData.uncorrectAnswer, isCorrectLeft);
      const rightGates = new Gates(isCorrectLeft ? gatesData.uncorrectAnswer : gatesData.correctAnswer, !isCorrectLeft);
      this.add(leftGates, rightGates);

      leftGates.position.set(leftX,0, gatesData.positionZ);
      rightGates.position.set(rightX, 0, gatesData.positionZ);

      this._gatesPool.push([leftGates, rightGates]);
    });
  }

  _onCollideGates(isCorrect) {
    if(isCorrect) {
      this.events.post('onCorrectCollide');
    } else {
      setTimeout(() => {
        const offsetX = MathUtils.randFloat(0.13, 0.15) * (Math.random() > 0.5 ? 1 : -1);
        const offsetY = MathUtils.randFloat(0.02, 0.03) * (Math.random() > 0.5 ? 1 : -1);
        const duration = MathUtils.randInt(240, 250);
  
        this._screenShake.shake(new THREE.Vector3(offsetX, offsetY, 0), duration);
  
        this._isShaking = true;
        setTimeout(() => {
          this._isShaking = false;
        }, duration);
      }, 100);
    }
  }
}