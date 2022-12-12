import { Black } from "black-engine";

export default class GameController {
  constructor(world, ui) {
    this._world = world;
    this._ui = ui;

    this._levelData = {
      correctCount: 0,
      mistakesCount: 0,
      totalCount: 0,
      mistakes: [],
    }

    this._listenSignals();
  }

  startLevel() {
    this._levelData = {
      correctCount: 0,
      mistakesCount: 0,
      totalCount: 0,
      mistakes: [],
    }
    
    this._world.start();
    this._ui.onStarted();
  }

  _listenSignals() {
    const world = this._world;
    const ui = this._ui;

    world.events.on('onCollide', (msg, isCorrect, text) => {
      if(isCorrect) {
        ui.increaseCounter();
        this._levelData.correctCount++;
      }else {
        this._levelData.mistakesCount++;
        this._levelData.mistakes.push(text);
      }

      this._levelData.totalCount++;
    });

    world.events.once('onFinished', () => {
      ui.onFinished(this._levelData);
    });

    Black.input.once('pointerDown', () => this.startLevel());
  }
}