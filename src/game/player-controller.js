import { Black } from "black-engine";
import lerp from "./utils/lerp";
import WORLD_CONFIG from "./world-config";

export default class PlayerController {
  constructor(player) { 

    this._player = player;
    this._prewX = Black.stage.bounds.center().x;
    this._basicInputWidth = 100;
    this._maxOffsetX = WORLD_CONFIG.platfotmWidth * 0.5;
    this._playerWidth = this._player.getWidth();
    this._listenSignals();
  }

  update(dt) {
    dt = 0.016
    const player = this._player;
    player.position.z += WORLD_CONFIG.playerSpeed * dt;
    const inputOffsetX = (Black.stage.bounds.center().x - this._prewX)/this._basicInputWidth;
    const offsetX = (Math.min(Math.abs(inputOffsetX), this._maxOffsetX) - this._playerWidth * 0.5) * (inputOffsetX > 0 ? 1 : -1);

    player.position.x = lerp(player.position.x, offsetX, 0.3);

    player.update();
  }

  _listenSignals() {
    document.addEventListener('pointermove', (event) => {
      this._prewX = event.x;
      this._isPointerMove = true;
    });
  }
}