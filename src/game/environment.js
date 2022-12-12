import * as THREE from 'three';
import Loader from '../loader';
import WORLD_CONFIG from './world-config';

export default class Environment extends THREE.Group {
  constructor(scene) {
    super();

    this._scene = scene;

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
    texture.repeat.set(lenght / textureSize, width / textureSize);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(geometry, material);

    this.add(ground);
    ground.rotation.x = Math.PI * 0.5;
    ground.position.y = -WORLD_CONFIG.platfotmWeight * 0.5;
  }

  _initSky() {
    const bgColor = 0x71cbf5;
    const skyGeo = new THREE.SphereGeometry(30, 32, 15);

    const uniforms = {
      topColor: {
        value: new THREE.Color(bgColor)
      },
      bottomColor: {
        value: new THREE.Color(bgColor).offsetHSL(0.05, 0.1, -0.15)
      },
      offset: { value: -3 },
      exponent: { value: 0.8 }
    };

    const skyMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldPosition = worldPosition.xyz;

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }`,

      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;

        varying vec3 vWorldPosition;

        void main() {
          float h = normalize( vWorldPosition + offset ).y;
          gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
        }`,
      side: THREE.BackSide,
    });

    const sky = this._sky = new THREE.Mesh(skyGeo, skyMat);
    this.add(sky);

    this._scene.fog = new THREE.Fog(uniforms.bottomColor.value, 0, 40);
  }
}