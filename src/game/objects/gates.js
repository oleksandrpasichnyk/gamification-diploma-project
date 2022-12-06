import { Black, CanvasRenderTexture, Graphics, Matrix, TextField } from 'black-engine';
import * as THREE from 'three';
import WORLD_CONFIG from '../world-config';

const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

export default class Gates extends THREE.Group {
  constructor(textString, isCorrect = true) { 
    super();

    this._textString = textString
    this._isCorrect = isCorrect;

    this._width = WORLD_CONFIG.platfotmWidth * 0.5;
    this._height = 0.95;

    this._isEnabled = true;

    this._init();
  }

  onCollide() {
    if(!this._isEnabled) {
      return;
    }

    this._material.color.set(this._isCorrect ? 0x00ff00 : 0xff0000);
    this._material.needsUpdate = true;

    return this._isCorrect;
  }

  isEnabled() {
    return this._isEnabled;
  }

  disable() {
    this._isEnabled = false;
  }

  _init() { 
    this._initPlane();
    this._initPillars();
    this._initText();
  }

  _initPlane() {
    const geometry = new THREE.PlaneBufferGeometry(this._width, this._height);
    geometry.translate(0, this._height * 0.5 + WORLD_CONFIG.platfotmWeight * 0.5, 0);
    const material = this._material = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.5, color: 0x5078e6, side: THREE.DoubleSide });
    const mesh = this._plane = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }

  _initPillars() {
    const r = 0.03;
    const geometry = new THREE.CylinderBufferGeometry(r, r, this._height, 10);
    geometry.translate(0, this._height * 0.5 + WORLD_CONFIG.platfotmWeight * 0.5, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const leftPillar = new THREE.Mesh(geometry, material);
    const rightPillar = new THREE.Mesh(geometry, material);

    this.add(leftPillar, rightPillar);

    leftPillar.position.x = -this._width * 0.5;
    rightPillar.position.x = this._width * 0.5;
  }

  _initText() {
    const renderTexture = new CanvasRenderTexture(512, 512 * this._height/this._width, Black.driver.renderScaleFactor);
    const texture = new THREE.CanvasTexture(renderTexture.native);
    const textMaterial = new THREE.MeshToonMaterial( { alphaTest: 0.1, transparent: true, opacity: 1, map: texture } );

    const geometry = new THREE.PlaneBufferGeometry(this._width, this._height);
    const textMesh = new THREE.Mesh(geometry, textMaterial);
    this.add(textMesh);
    textMesh.rotateY(Math.PI);

    renderTexture.renderTarget.clear();

    const text = new TextField(this._textString);
    text.autoSize = true;
    text.textColor = 0xffffff;
    text.multiline = true;
    text.size = 60;
    text.strokeColor = 0x000000;
    text.strokeThickness = 5;
    text.align = 'center';
    text.alignPivotOffset();
    text.x = renderTexture.width * 0.5;
    text.y = renderTexture.height * 0.5;

    Black.driver.render(text, renderTexture, new Matrix());

    textMesh.position.y = this._height * 0.55;
    textMesh.position.z = -0.01;
    textMesh.scale.set(2, 2, 2);
  }
}