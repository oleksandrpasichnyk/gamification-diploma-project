import { Tween } from "black-engine";
import { Ease } from "black-engine";
import { DisplayObject, TextField } from "black-engine";

export default class TaskText extends DisplayObject {
  constructor() {
    super();

    this.visible = false;

    this._init();
  }

  show() {
    this.visible = true;
    this.alpha = 0;

    const tweenAlpha = new Tween({
      alpha: 1,
    }, 0.45,
    {
      playOnAdded: true,
      removeOnComplete: true,
      ease: Ease.sinusoidalOut,
    });

    this.addComponent(tweenAlpha);
  }

  hide() {
    const tweenAlpha = new Tween({
      alpha: 0,
    }, 0.35,
    {
      playOnAdded: true,
      removeOnComplete: true,
      ease: Ease.sinusoidalOut,
    });

    this.addComponent(tweenAlpha);
    tweenAlpha.on('complete', () => {
      this.visible = false;
    })
  }

  _init() {
    const string = 'Оберіть правильний\nваріант наголосу слів';
    const text = this._text = new TextField(string, 'Arial', 0xffffff, 35);
    this.add(text);

    text.multiline = true;
    text.align = 'center';
    text.strokeColor = '#333333';
    text.strokeThickness = 3;
    text.weight = '100';
    text.alignPivotOffset(0.5, 0);
  }
}