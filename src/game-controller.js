export default class GameController {
  constructor(world, ui) {
    this._world = world;
    this._ui = ui;

    this._listenSignals();
  }

  _listenSignals() {
    const world = this._world;
    const ui = this._ui;

    world.events.on('onCorrectCollide', () => ui.increaseCounter());
  }
}