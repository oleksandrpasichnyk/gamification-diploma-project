import * as THREE from 'three';
import WORLD_CONFIG from '../world-config';

export default class Platform extends THREE.Group {
  constructor() { 
    super();

    this._init();
  }

  update(dt) {

  }

  _init() { 
    const geometry = new THREE.BoxBufferGeometry(WORLD_CONFIG.platfotmWidth, WORLD_CONFIG.platfotmWeight, WORLD_CONFIG.platfotmLength);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
}