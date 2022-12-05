import * as THREE from 'three';
import Loader from '../../loader';
import Utils from '../utils/utils';
import WORLD_CONFIG from '../world-config';

export default class Book extends THREE.Group {
  constructor() { 
    super();

    this._init();
  }

  getWidth() {
    return Utils.getBoundingBox(this.book).x;
  }

  update(dt) {
    const rotationZ = -(this.position.x/WORLD_CONFIG.platfotmWidth * 0.5) * Math.PI * 0.3;
    this.rotation.z = rotationZ;
  }

  _init() {
    this._initBook();
    this._initPlate();

    this.rotateX(Math.PI * 0.1);
  };

  _initBook() {
    const book = this.book = Utils.createObject('book');
    this.add(book);

    // console.log(book);

    book.rotation.x = Math.PI * 0.5;
    book.rotation.y = Math.PI;

    const boundingBox = Utils.getBoundingBox(book);
    book.position.y = boundingBox.y * 0.7;
    book.position.x = boundingBox.x * 0.55;

    Utils.setObjectMaterial(book, new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
  }

  _initPlate() {
    const texture = Loader.Assets['book_cover'];
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const boundingBox = Utils.getBoundingBox(this.book);

    const geometry = new THREE.PlaneBufferGeometry(boundingBox.x, boundingBox.y)
    const plane = new THREE.Mesh(geometry, material);

    this.add(plane);
    plane.position.y = this.book.position.y;
    plane.position.z = -boundingBox.z - 0.005;

    plane.rotation.y = Math.PI;
  }
}