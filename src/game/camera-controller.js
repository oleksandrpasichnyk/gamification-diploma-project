import GLOBAL_CONFIG from "../config";
import { lerpVec } from "./utils/lerp";

export default class CameraController {
  constructor(player, camera) { 
    this._camera = camera;
    this._player = player;
  }

  setStartPosition() {
    this._camera.position.copy(this._getCameraPosition());
    this._setLookAt();
  }

  update() {
    this._camera.position.copy(lerpVec(this._camera.position, this._getCameraPosition(), 0.8));
    this._setLookAt();
  }

  _setLookAt() {
    const lookAt = this._player.position.clone();
    lookAt.y += 1;
    this._camera.lookAt(lookAt);
  }

  _getCameraPosition() {
    const cameraPosition = this._player.position.clone().add(GLOBAL_CONFIG.cameraPosition);
    return cameraPosition;
  }
}