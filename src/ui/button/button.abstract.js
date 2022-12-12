import { Black, DisplayObject, Ease, Tween } from "black-engine";

export default class ButtonAbstract extends DisplayObject {
  constructor() {
    super();

    this._pointerMoveOnButton = false;
    this._isPressed = false;
    this._correctClick = false;

    this.listenSignals();
  }

  listenSignals() {
    this.on('pointerDown', () => this.onPointerDown());
    this.on('pointerUp', () => this.onPointerUp());
    this.on('pointerMove', () => this.onPointerMove());
    Black.input.on('pointerMove', () => this.onGlobalPointerEvent());
  }

  onPointerDown() {
    this._isPressed = true;
    this._pointerMoveOnButton = true;
    this._correctClick = true;

    this.removeComponent(this.getComponent((Tween)));
    this._scale = 1;

    const tween = new Tween({ scale: 0.95 }, 0.1, { ease: Ease.sinusoidalIn });
    this.add(tween);
  }

  onPointerUp() {
    if (this._correctClick) {
      this.post('onClick');
    }

    this._isPressed = false;
    this._pointerMoveOnButton = false;
    this.removeComponent(this.getComponent((Tween)));

    const tween = new Tween({ scale: 1 }, 0.1, { ease: Ease.sinusoidalOut });
    this.add(tween);
  }

  onPointerMove() {
    this._pointerMoveOnButton = true;
  }

  onGlobalPointerEvent() {
    if (this._isPressed) {
      if (!this._pointerMoveOnButton) {
        this._correctClick = false;
        this.onPointerUp();
      }

      this._pointerMoveOnButton = false;
    }
  }
}