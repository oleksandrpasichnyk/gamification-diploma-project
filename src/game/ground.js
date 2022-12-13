import * as THREE from 'three';
import Loader from '../loader';
import WORLD_CONFIG from './world-config';

export default class Ground extends THREE.Group {
  constructor() {
    super();

    this._init();
  }

  _init() {
    const width = 400;
    const lenght = 800;
    const geometry = new THREE.PlaneBufferGeometry(lenght, width);
    geometry.translate(0, width * 0.5 - 20, 0);

    const texture = Loader.Assets['sunflowers'];
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    const textureSize = 5;
    texture.repeat.set(lenght / textureSize, width / textureSize);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(geometry, material);

    this.add(ground);
    ground.rotation.x = Math.PI * 0.5;
    ground.position.y = -WORLD_CONFIG.platfotmWeight * 0.5;

    ground.receiveShadow = true;
  }
}