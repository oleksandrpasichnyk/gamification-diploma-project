import GLOBAL_CONFIG from "../config";
import { lerpVec } from "./utils/lerp";

export default class CameraController {
  constructor(player, camera) { 
    this._camera = camera;
    this._player = player;
  }

  setStartPosition() {
    const cameraPosition = this._getCameraPosition();
    this._camera.position.copy(cameraPosition);
    const lookAt = this._player.position.clone();
    lookAt.y += 1;
    this._camera.lookAt(lookAt);
  }

  update() {
    const cameraPosition = this._getCameraPosition();
    this._camera.position.copy(lerpVec(this._camera.position, cameraPosition, 0.8));
    const lookAt = this._player.position.clone();
    lookAt.y += 1;
    this._camera.lookAt(lookAt);
  }

  _getCameraPosition() {
    const cameraPosition = this._player.position.clone().add(GLOBAL_CONFIG.cameraPosition);
    return cameraPosition;
  }
}