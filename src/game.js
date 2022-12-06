import * as THREE from 'three';
import { Black } from "black-engine";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GLOBAL_CONFIG from "./config";
import World from "./game/world";
import UI from "./ui/ui";
import GameController from './game-controller';

export default class Game {
  constructor() {
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._orbitControls = null;
    this._world = null;
    this._ui = null;

    this._isPause = false;
    this._clock = new THREE.Clock();
    this._clock.start();

    this._init();
  }

  _init() {
    this._initScene();
    this._initCamera();
    this._initOrbitControls();
    this._initRenderer();
    this._initLight();

    this._initWorld()
    
    Black.engine.containerElement.prepend(this._renderer.domElement);
    Black.engine.on('paused', () => this._onPause());
    Black.engine.on('unpaused', () => this._onUnPause());

    window.addEventListener('resize', () => this.onResize());

    setTimeout(() => {
      window.requestAnimationFrame(() => this.update());
    }, 100);
  }

  _initScene() {
    const scene = this._scene = new THREE.Scene()
    scene.background = new THREE.Color(0x80dfff);
  }

  _initCamera() {
    const camera = this._camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      5000
    )

    camera.position.x = 1
    camera.position.y = 1
    camera.position.z = 50
    this._scene.add(camera)
  }

  _initOrbitControls() {
    if(GLOBAL_CONFIG.orbitControls) { 
      const orbitControls = this._orbitControls = new OrbitControls(this._camera, Black.engine.containerElement);
      orbitControls.enableDamping = true;
      // controls.enableZoom = false;
      orbitControls.enablePan = false;
      orbitControls.dampingFactor = 0.05;
      orbitControls.maxDistance = 30;
      orbitControls.minDistance = 1;
      orbitControls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
    }
  }

  _initRenderer() {
    const renderer = this._renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('canvas.webgl'),
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.95;
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.userSelect = 'none';
    renderer.domElement.style.overflow = 'hidden';
  }

  _initLight() {
    const {
      ambientLightEnabled,
      ambientLightColor,
      ambientLightIntensity,
    
      directionalLightEnabled,
      directionalLightColor,
      directionalLightIntensity,
      directionalLightPosition,
      directionalLightLookAt
    } = GLOBAL_CONFIG;
    
    if (directionalLightEnabled) {
      const directionalLight = new THREE.DirectionalLight(directionalLightColor, 0.1);
      directionalLight.lookAt(directionalLightLookAt.x, directionalLightLookAt.y, directionalLightLookAt.z);
      directionalLight.position.set(directionalLightPosition.x, directionalLightPosition.y, directionalLightPosition.z);
      this._scene.add(directionalLight);

      directionalLight.castShadow = true;
      // directionalLight.shadow.bias = -0.01
      directionalLight.shadow.mapSize.width = 1300;
      directionalLight.shadow.mapSize.height = 1300;
    
      const shadowCamera = directionalLight.shadow.camera;
      shadowCamera.left = -7 * 0.4;
      shadowCamera.right = 7 * 0.4;
      shadowCamera.bottom = -7 * 0.5;
      shadowCamera.top = 7 * 0.5;
      shadowCamera.far = 40;
    }
    
    const directionalLight = new THREE.DirectionalLight(directionalLightColor, 0.75);
    directionalLight.lookAt(directionalLightLookAt.x, directionalLightLookAt.y, directionalLightLookAt.z);
    directionalLight.position.set(directionalLightPosition.x, directionalLightPosition.y, directionalLightPosition.z);
    this._scene.add(directionalLight);

    directionalLight.castShadow = false;
    // directionalLight.shadow.bias = -0.01
    directionalLight.shadow.mapSize.width = 1300;
    directionalLight.shadow.mapSize.height = 1300;
    
    const shadowCamera = directionalLight.shadow.camera;
    shadowCamera.left = -7 * 0.4;
    shadowCamera.right = 7 * 0.4;
    shadowCamera.bottom = -7 * 0.5;
    shadowCamera.top = 7 * 0.5;
    shadowCamera.far = 40;
    
    
    if (ambientLightEnabled) {
      const ambientlight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
      this._scene.add(ambientlight);
    }
  }

  onResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    const { _camera: camera, _renderer: renderer } = this;

    // Update camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  
    // Update renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  _initWorld() {
    const world = this._world = new World(this._camera);
    this._scene.add(world);

    const ui = this._ui = new UI();
    Black.stage.add(ui);

    this._gameController = new GameController(world, ui);
  }

  update() {
    const dt = this._clock.getDelta();
  
    if (this._isPause === false) {
      if(this._world) {
        this._world.update(dt);
      }
  
      this._renderer.render(this._scene, this._camera);
  
      if(GLOBAL_CONFIG.orbitControls) {
        this._orbitControls.update();
      }
    }
    
    window.requestAnimationFrame(() => this.update());
  }

  _onPause() {
    this._clock.stop();
    this._isPause = true;
  }
  
  _onUnPause () {
    this._clock.start();
    this._isPause = false;
  }
}