import { Black, DisplayObject } from "black-engine";
import Counter from "./counter";
import EndLevelScreen from "./end-level-screen/end-level-screen";

export default class UI extends DisplayObject {
  constructor() {
    super();

    this._counter = null;
    this._endLevelScreen = null;

    this.touchable = true;
    this._init();
  }

  increaseCounter() {
    this._counter.increaseValue();
  }

  onResize() {
    const bounds = Black.stage.bounds;
    const counter = this._counter;
    
    counter.x = bounds.center().x;
    counter.y = bounds.top + 100;

    this._endLevelScreen.onResize();
  }

  onStarted() {
    this._counter.show();
  }

  onFinished(levelData) {
    this._counter.hide();
    this._endLevelScreen.setResult(levelData);
    this._endLevelScreen.show();
  }

  _init() {
    this._initCounter();
    this._initEndLevelScreen();

    Black.stage.on('resize', () => this.onResize());
    this.onResize();
  }

  _initCounter() {
    const counter = this._counter = new Counter();
    this.add(counter);
  }

  _initEndLevelScreen() {
    const endLevelScreen = this._endLevelScreen = new EndLevelScreen();
    this.add(endLevelScreen);
  }
}