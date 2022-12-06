import * as THREE from 'three';
import Loader from '../loader';
import WORLD_CONFIG from './world-config';

export default class Environment extends THREE.Group {
  constructor() { 
    super();


    this._init();
  }

  getSky() {
    return this._sky;
  }

  _init() { 
    this._initGround();
    this._initSky();
  }

  _initGround() {
    const width = 400;
    const lenght = 800;
    const geometry = new THREE.PlaneBufferGeometry(lenght, width);
    geometry.translate(0, width * 0.5 - 20, 0);

    const texture = Loader.Assets['sunflowers'];
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    const textureSize = 5;
    texture.repeat.set(lenght/textureSize, width/textureSize);

    const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(geometry, material);

    this.add(ground);
    ground.rotation.x = Math.PI * 0.5;
    ground.position.y = -WORLD_CONFIG.platfotmWeight * 0.5;
  }

  _initSky() {
    const bgColor = 0x4287f5;
    const skyGeo = new THREE.SphereGeometry(30, 32, 15);

    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(bgColor) },
        color2: { value: new THREE.Color(bgColor).offsetHSL(-0.15, 0.3, 0.1) },
      },
      vertexShader: `
        varying vec2 vUv;
    
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
      
        varying vec2 vUv;
        
        void main() {
          
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const sky = this._sky = new THREE.Mesh(skyGeo, skyMat);
    this.add(sky);
  }
}