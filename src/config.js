import * as THREE from 'three';

const GLOBAL_CONFIG = {
  orbitControls: false,

  cameraPosition: new THREE.Vector3(0, 1.8, -3),
  ambientLightEnabled: true,
  ambientLightColor: 0xffffff,
  ambientLightIntensity: 0.4,

  directionalLightEnabled: true,
  directionalLightColor: 0xffffff,
  directionalLightIntensity: 0.75,
  directionalLightPosition: { x: -70, y: 400, z: -300 },
  directionalLightLookAt: { x: 0, y: 0, z: 20 },

  percentToWin: 65,
}

export default GLOBAL_CONFIG;