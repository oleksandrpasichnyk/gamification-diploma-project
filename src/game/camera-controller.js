import GLOBAL_CONFIG from "../config";

export default class CameraController {
  constructor(player, camera) { 
    this._camera = camera;
    this._player = player;
  }

  update() {
    const cameraPosition = this._player.position.clone().add(GLOBAL_CONFIG.cameraPosition);
    this._camera.position.copy(cameraPosition);
    this._camera.lookAt(this._player.position);
  }
}