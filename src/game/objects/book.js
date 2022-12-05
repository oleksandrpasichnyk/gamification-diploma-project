import * as THREE from 'three';
import Loader from '../../loader';
import Utils from '../utils/utils';

export default class Book extends THREE.Group {
  constructor() { 
    super();

    this._init();
  }

  update(dt) {

  }

  _init() {
    this._initBook();
    this._initPlate();
  };

  _initBook() {
    const book = this.book = Utils.createObject('book');
    this.add(book);

    // console.log(book);

    book.rotation.x = Math.PI * 0.5;

    const boundingBox = Utils.getBoundingBox(book);
    book.position.y = boundingBox.y * 0.5;
    book.position.x = -boundingBox.x * 0.55;

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
    plane.position.z = 0.005;
  }
}