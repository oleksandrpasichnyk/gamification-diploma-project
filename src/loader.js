import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { MessageDispatcher } from 'black-engine';

// import book from './assets/models/book.glb'
// import book_cover from './assets/textures/book_cover.jpg';

export default class Loader {
  constructor() { 
    this.events = new MessageDispatcher();

    Loader.Assets = {};

    this.load();
  }

  load() {
    const manager = new THREE.LoadingManager();
    
    this.modelsLoader = new GLTFLoader(manager);
    this.textureLoader = new THREE.TextureLoader(manager);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    this.modelsLoader.setDRACOLoader( dracoLoader );

    this.loadModels();
    this.loadTextures();


    manager.onLoad = () => {
      this.events.post('onLoaded');
    };
  }

  loadModels() {
    this.modelsLoader.load('./assets/models/book.glb', asset => Loader.Assets['book'] = asset);
  }

  loadTextures() {
    this.textureLoader.load('./assets/textures/book_cover.jpg', texture => Loader.Assets['book_cover'] = texture);
  }
}

Loader.Assets = {};