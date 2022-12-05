import * as THREE from 'three';
import Loader from '../../loader';
import WORLD_CONFIG from '../world-config';

export default class Platform extends THREE.Group {
  constructor() { 
    super();

    this._init();
  }

  _init() {
    const geometry = new THREE.BoxBufferGeometry(WORLD_CONFIG.platfotmWidth + 0.1, WORLD_CONFIG.platfotmWeight, WORLD_CONFIG.platfotmLength);
    geometry.translate(0, 0, -WORLD_CONFIG.platfotmLength * 0.5);
    const texture = Loader.Assets['road_bw'];

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(1, 118);

    const material = new THREE.MeshStandardMaterial({ color: 0xf0eeff, map: texture });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    mesh.rotation.y = Math.PI;
  }
}