import * as THREE from 'three';

const GLOBAL_CONFIG = {
  orbitControls: false,

  cameraPosition: new THREE.Vector3(0, 1.8, -3),
  ambientLightEnabled: true,
  ambientLightColor: 0xffffff,
  ambientLightIntensity: 0.3,

  directionalLightEnabled: true,
  directionalLightColor: 0xffffff,
  directionalLightIntensity: 0.4,
  directionalLightPosition: { x: 7, y: 40, z: -30 },
  directionalLightLookAt: { x: 0, y: 0, z: 20 },
}

export default GLOBAL_CONFIG;