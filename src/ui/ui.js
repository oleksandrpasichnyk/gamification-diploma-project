import { Black, DisplayObject, Graphics, TextField } from "black-engine";
import Counter from "./counter";

export default class UI extends DisplayObject {
  constructor() {
    super();

    this._init();
  }

  onResize() {
    const bounds = Black.stage.bounds;
    const counter = this._counter;
    
    counter.x = bounds.center().x;
    counter.y = bounds.top + 100;
  }

  _init() {
    this._initCounter();

    Black.stage.on('resize', () => this.onResize());
    this.onResize();
  }

  _initCounter() {
    const counter = this._counter = new Counter();
    this.add(counter);
  }
}