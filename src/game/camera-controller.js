import GLOBAL_CONFIG from "../config";
import { lerpVec } from "./utils/lerp";

export default class CameraController {
  constructor(player, camera) { 
    this._camera = camera;
    this._player = player;
  }

  update() {
    const cameraPosition = this._player.position.clone().add(GLOBAL_CONFIG.cameraPosition);
    this._camera.position.copy(lerpVec(this._camera.position, cameraPosition, 0.8));
    this._camera.lookAt(this._player.position);
  }
}