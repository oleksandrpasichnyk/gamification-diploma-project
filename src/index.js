import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import World from './game/world'

/**
 * GUI Controls
 */
import * as dat from 'dat.gui'
import GLOBAL_CONFIG from './config'
import Loader from './loader'
import { Black, CanvasDriver, Engine, GameObject, Input, MasterAudio, StageScaleMode } from 'black-engine'
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x80dfff);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  5000
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 50
scene.add(camera)

// Controls

let orbitControls;

if(GLOBAL_CONFIG.orbitControls) { 
  orbitControls = new OrbitControls(camera, canvas)
  orbitControls.enableDamping = true
  // controls.enableZoom = false
  orbitControls.enablePan = false
  orbitControls.dampingFactor = 0.05
  orbitControls.maxDistance = 30
  orbitControls.minDistance = 1
  orbitControls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  }
}


const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


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
  scene.add(directionalLight);
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
scene.add(directionalLight);
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
  scene.add(ambientlight);
}


const loader = new Loader();
let world;

loader.events.on('onLoaded', () => {
  const engine = new Engine('webgl', GameObject, CanvasDriver, [Input, MasterAudio]);
  engine.pauseOnBlur = true;
  engine.pauseOnHide = true;
  engine.viewport.isTransperent = false;
  engine.start();

  engine.stage.setSize(640, 960);
  engine.stage.scaleMode = StageScaleMode.LETTERBOX;

  Black.engine.on('paused', () => onPause());
  Black.engine.on('unpaused', () => onUnPause());

  world = new World(camera);
  scene.add(world);
});

const clock = new THREE.Clock();
clock.start();

let isPause = false;

const update = () => {
  const dt = clock.getDelta();

  if (isPause === false) {
    if(world) {
      world.update(dt);
    }

    renderer.render(scene, camera);

    if(GLOBAL_CONFIG.orbitControls) {
      orbitControls.update();
    }
  }
  
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

const onPause = () => {
  clock.stop();
  isPause = true;
}

const onUnPause = () => {
  clock.start();
  isPause = false;
}


showFPSMeter();

function showFPSMeter() {
  (function () {
    var script = document.createElement('script');
    script.onload = function () {
      var stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
  })();
};