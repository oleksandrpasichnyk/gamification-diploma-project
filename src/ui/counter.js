import { Tween } from "black-engine";
import { Ease } from "black-engine";
import { DisplayObject, TextField } from "black-engine";

export default class Counter extends DisplayObject {
  constructor() {
    super();

    this._value = 0;
    this.visible = false;

    this._init();
  }

  show() {
    this.visible = true;
    this.scale = 0;

    const tweenScale = new Tween({
      scale: 1,
    }, 0.25,
    {
      playOnAdded: true,
      removeOnComplete: true,
      ease: Ease.sinusoidalOut,
    });

    this.addComponent(tweenScale);
  }

  hide() {
    const tweenScale = new Tween({
      scale: 0,
    }, 0.15,
    {
      playOnAdded: true,
      removeOnComplete: true,
      ease: Ease.sinusoidalOut,
    });

    this.addComponent(tweenScale);
    tweenScale.on('complete', () => {
      this.visible = false;
    })
  }

  increaseValue() {
    this._value++;
    this._counter.text = this._value.toString();
    this._counter.alignPivotOffset(0.5);
  }

  _init() {
    const counter = this._counter = new TextField(this._value.toString(), 'Arial', 0xffffff, 60);
    this.add(counter);

    counter.strokeColor = '#333333';
    counter.strokeThickness = 4;
    counter.weight = '600';
    counter.alignPivotOffset(0.5);
  }
}