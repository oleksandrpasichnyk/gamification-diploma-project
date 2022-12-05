import * as THREE from 'three';
import Utils from '../utils/utils';
import WORLD_CONFIG from '../world-config';

export default class Platform extends THREE.Group {
  constructor() { 
    super();

    this._init();
  }

  _init() { 
    const geometry = new THREE.BoxBufferGeometry(WORLD_CONFIG.platfotmWidth, WORLD_CONFIG.platfotmWeight, WORLD_CONFIG.platfotmLength);
    geometry.translate(0, 0, -WORLD_CONFIG.platfotmLength * 0.5);
    const material = new THREE.MeshStandardMaterial({ color: 0xeeeeee });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    mesh.rotation.y = Math.PI;
  }
}