import * as THREE from 'three';
import { Black, MessageDispatcher } from "black-engine";
import { lerp } from "./utils/lerp";
import WORLD_CONFIG from "./world-config";

export default class PlayerController {
  constructor(player, gatesPool) {
    this.events = new MessageDispatcher();

    this._player = player;
    this._gatesPool = gatesPool;

    this._prewX = window.innerWidth * 0.5;
    this._basicInputWidth = Math.max(100, window.innerWidth * 0.1);
    this._maxOffsetX = WORLD_CONFIG.platfotmWidth * 0.5;
    this._playerWidth = this._player.getWidth();

    this._isFinished = false;

    this._listenSignals();
  }

  finish() {
    if(this._isFinished) {
      return;
    }

    this._isFinished = true;
    console.log('finish')
    this.events.post('onFinished');
  }

  update(dt) {
    dt = 0.016
    if(this._isFinished) {
      return;
    }

    const player = this._player;
    player.position.z += WORLD_CONFIG.playerSpeed * dt;

    const inputOffsetX = (window.innerWidth * 0.5 - this._prewX)/this._basicInputWidth;
    const offsetX = (Math.min(Math.abs(inputOffsetX), this._maxOffsetX) - this._playerWidth * 0.5) * (inputOffsetX > 0 ? 1 : -1);

    player.position.x = lerp(player.position.x, offsetX, 0.3);

    player.update();

    const gatesPool = this._gatesPool;

    gatesPool.forEach((pair, index) => {
      const positionZ = pair[0].position.z;

      if(positionZ - player.position.z < 0.1 && pair[0].isEnabled()) {
        const gate = player.position.x > 0 ? pair[0] : pair[1];
        const isCorrect = gate.onCollide();

        this._onCollideGates(isCorrect, gate.getText());

        pair[0].disable();
        pair[1].disable();

        setTimeout(() => {
          gatesPool.splice(index, 1);

          if(gatesPool.length === 0){
            this.finish();
          }
        }, 1000);
      }
    });
  }

  _onCollideGates(isCorrect, text) {
    this.events.post('onCollideGates', isCorrect, text);
  }

  _listenSignals() {
    document.addEventListener('pointermove', (event) => {
      this._prewX = event.x;
      this._isPointerMove = true;
    });
  }
}