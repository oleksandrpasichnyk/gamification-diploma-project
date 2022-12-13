import { Black, DisplayObject } from "black-engine";
import Counter from "./counter";
import EndLevelScreen from "./end-level-screen/end-level-screen";
import TaskText from "./task-text";

export default class UI extends DisplayObject {
  constructor() {
    super();

    this._counter = null;
    this._taskText = null;
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
    const taskText = this._taskText;
    
    counter.x = taskText.x = bounds.center().x;
    counter.y = bounds.top + 100;
    taskText.y = bounds.top + 200;

    this._endLevelScreen.onResize();
  }

  onStarted() {
    this._counter.show();
    this._taskText.show();
    setTimeout(() => {
      this._taskText.hide();
    }, 6000);
  }

  onFinished(levelData) {
    this._counter.hide();
    this._taskText.hide();

    this._endLevelScreen.setResult(levelData);
    setTimeout(() => {
      this._endLevelScreen.show();
    }, 500);
  }

  _init() {
    this._initCounter();
    this._initTaskText();
    this._initEndLevelScreen();

    Black.stage.on('resize', () => this.onResize());
    this.onResize();
  }

  _initCounter() {
    const counter = this._counter = new Counter();
    this.add(counter);
  }

  _initTaskText() {
    const taskText = this._taskText = new TaskText();
    this.add(taskText);
  }

  _initEndLevelScreen() {
    const endLevelScreen = this._endLevelScreen = new EndLevelScreen();
    this.add(endLevelScreen);
  }
}