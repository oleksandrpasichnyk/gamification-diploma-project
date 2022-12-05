import * as THREE from 'three';
import { Device } from 'black-engine';
import Loader from '../../loader';

const defaultMaterial = new THREE.MeshLambertMaterial();
const tempBox3 = new THREE.Box3();

function getFirstClonableChild(root) {
  return root.clone();
  // for (let i = 0; i < root.children.length; i++) {
  //   const child = root.children[i];
  //
  //   if (typeof child.clone === 'function') {
  //     return child.clone();
  //   }
  // }
}

export default class Utils {
  static createObject(name, material = null) {
    const object = Loader.Assets[name];
    if (!object) {
      throw new Error(`Object ${name} is not in the cache.`);
    }

    const result = (object.scene) ?
      getFirstClonableChild(object.scene) :
      getFirstClonableChild(object);

    if (material === null) {
      return result;
    }

    return Utils.setObjectMaterial(result, material);
  }

  static setObjectMaterial(object, newMaterial) {
    object.traverse(child => {
      if (child.isMesh) {
        child.material = newMaterial;
      }
    });

    return object;
  }

  static setCastShadows(object, value) {
    object.traverse(child => {
      child.castShadow = value;
    });

    return object;
  }

  static setReceiveShadows(object, value) {
    object.traverse(child => {
      child.receiveShadow = value;
    });

    return object;
  }

  static getMesh(object) {
    return object.isMesh ? object : object.getObjectByProperty('isMesh', true);
  }

  static getMeshByName(object, name) {
    let obj = null;

    object.traverse(child => {
      if(child.isMesh && child.name === name) {
        obj = child;
      }
    });

    return obj;
  }

  static toScreenPosition(vector3, camera, renderer) {
    const dpr = Device.pixelRatio;
    const width = renderer.context.canvas.width / dpr;
    const height = renderer.context.canvas.height / dpr;
    const position = new THREE.Vector2().copy(vector3);

    camera.updateMatrixWorld();
    position.project(camera);

    position.x = ((position.x + 1) * width) / 2;
    position.y = (-(position.y - 1) * height) / 2;

    return position;
  }

  static getBoundingBox(target) {
    tempBox3.setFromObject(target);
    return tempBox3.getSize(new THREE.Vector3());
  }
}