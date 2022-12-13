import { Graphics } from "black-engine";
import { Sprite, TextField } from "black-engine";
// import Localization from "../../../core/localization/localization";
import ButtonAbstract from "./button.abstract";

export default class TextIconButton extends ButtonAbstract {
  constructor(frameName, textString, iconFrame = null, scale = 1) {
    super();

    this._btnScale = scale || 1;
    this._scale = this._btnScale;
    this._bgFrameName = frameName;
    this._iconFrame = iconFrame;
    this._textString = textString;
    this._hasIcon = !!iconFrame;

    this._text = null;
    this._bg = null;
    this._icon = null;

    this.touchable = true;
    this._init();
  }

  getWidth() {
    return this._bg.width;
  }

  getHeight() {
    return this._bg.height;
  }

  _init() {
    this._initView();
    this._initText();
    if(this._hasIcon) {
      this._initIcon();
    }

    const { _icon: icon, _text: text, _bg: bg, _hasIcon: hasIcon } = this;
    const offset = 15;

    if(hasIcon) {
      icon.x = -bg.width * 0.5 + icon.width * 0.5 + offset;
      text.x = icon.x + icon.width * 0.5 + offset * 0.5;
      // Localization.fitText(text, bg.width -offset * 2.5 - icon.width, bg.height * 0.8);
      text.alignPivotOffset(0, 0.5);
    }else{
      text.x = 0;
      // Localization.fitText(text, bg.width * 0.8, bg.height * 0.8);
      text.alignPivotOffset();
    }
  }

  _initView() {
    const bg = this._bg = new Graphics();
    bg.beginPath();
    bg.fillStyle(0x1fb8ff);
    bg.lineStyle(4, 0x1198d6);
    bg.roundedRect(0, 0, 250, 75, 10);
    bg.closePath();
    bg.fill();
    bg.stroke();
    bg.alignPivotOffset();

    this.add(bg);
  }

  _initText() {
    const text = this._text = new TextField(this._textString, 'Arial', 0xffffff, 40);
    text.alignPivotOffset(0.5);
    text.strokeColor = 0x1198d6;
    text.strokeThickness = 10;
    text.weight = '600';
    text.touchable = true;
    text.y = 4;

    this.add(text);

    return text;
  }

  _initIcon() {
    const icon = this._icon = new Sprite(this._iconFrame);
    icon.touchable = true;
    icon.height = this._bg.height * 0.6;
    icon.scaleX = icon.scaleY;
    icon.alignPivotOffset();

    this.add(icon);
  }
}
