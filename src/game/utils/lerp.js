import * as THREE from 'three';

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
}

const lerpVec = (startVec, endVec, t) => {
  const x = lerp(startVec.x, endVec.x, t);
  const y = lerp(startVec.y, endVec.y, t);
  const z = lerp(startVec.z, endVec.z, t);

  return new THREE.Vector3(x, y, z);
}

export { lerp, lerpVec };