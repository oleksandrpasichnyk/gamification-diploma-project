import { Black, MessageDispatcher } from 'black-engine';
import * as THREE from 'three';
import { MathUtils } from "three";
import GLOBAL_CONFIG from '../config';
import CameraController from './camera-controller';
import GATES_CONFIG from './data/gates-config';
import Environment from './environment';
import Book from './objects/book';
import Gates from './objects/gates';
import Platform from './objects/platform';
import PlayerController from './player-controller';
import ScreenShake from './utils/screen-shake';
import WORLD_CONFIG from './world-config';

export default class World extends THREE.Group {
  constructor(camera, scene) { 
    super();
    this.events = new MessageDispatcher();

    this._camera = camera;
    this._scene = scene;
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
      this._sky.position.copy(this._book.position);
    }
  }

  _init() { 
    this._initPlatform();
    this._initBook();
    this._initGates();
    this._initEnvironment();

    this._cameraController = new CameraController(this._book, this._camera);
    this._cameraController.setStartPosition();

    this._playerController = new PlayerController(this._book, this._gatesPool);
    this._playerController.events.on('onCollideGates', (msg, isCorrect, text) => this._onCollideGates(isCorrect, text));
    this._playerController.events.on('onFinished', () => this._finish());
  }

  _initEnvironment() {
    const environment = this._environment = new Environment(this._scene);
    this.add(environment);

    this._sky = environment.getSky();
  }

  _initPlatform() {
    const platform = this.platform = new Platform();
    this.add(platform);
  }

  _initBook() {
    const book = this._book = new Book();
    this.add(book);

    book.position.set(0, 0, 5);
  }

  _initGates() {
    const leftX = WORLD_CONFIG.platfotmWidth * 0.25;
    const rightX = -WORLD_CONFIG.platfotmWidth * 0.25;
    const startPositionZ = 15;
    const distanceBetweenGates = 13;

    GATES_CONFIG.forEach((gatesData, i) => {
      const isCorrectLeft = Math.random() > 0.5;

      const leftGates = new Gates(isCorrectLeft ? gatesData.correctAnswer : gatesData.uncorrectAnswer, isCorrectLeft);
      const rightGates = new Gates(isCorrectLeft ? gatesData.uncorrectAnswer : gatesData.correctAnswer, !isCorrectLeft);
      this.add(leftGates, rightGates);

      const positionZ = i * distanceBetweenGates + startPositionZ; //gatesData.positionZ;
      leftGates.position.set(leftX,0, positionZ);
      rightGates.position.set(rightX, 0, positionZ);

      this._gatesPool.push([leftGates, rightGates]);
    });
  }

  _onCollideGates(isCorrect, text) {
    this.events.post('onCollide', isCorrect, text);
    
    if(!isCorrect) {
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

  _finish() {
    this.events.post('onFinished');
  }
}