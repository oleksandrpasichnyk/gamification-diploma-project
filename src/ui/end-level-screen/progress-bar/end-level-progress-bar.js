import { Black, Graphics, DisplayObject, Rectangle, TextField } from "black-engine";

export default class EndLevelProgressBar extends DisplayObject {
  constructor() {
    super();

    this._currentValue = 0;
    this._targetValue = 0;
    this._interpolationSpeed = 0.8;
  
    this._bg = null;
    this._bar = null;
    this._percentText = null;
  
    this._totalWidth = 330;
    this._totalHeight = 40;
    this._isBared = false;
    this._darkColor = 0x222222;
    this._barColor = 0x62f241;

    this.touchable = false;

    this.init();
  }

  reset() {
    this._currentValue = 0;
    this._targetValue = 0;
  }

  setProgress(value) {
    this._targetValue = value;
  }

  init() {
    this.initBg();
    this.initBar();
    this.initPercentText();
    this.drawBars();
  }

  initBg() {
    const bg = this._bg = new Graphics();
    this.add(bg);
  }

  initBar() {
    const bar = this._bar = new Graphics();
    this.add(bar);

    bar.visible = false;
  }

  initPercentText() {
    const percentText = this._percentText = new TextField('', 'Arial', 0xffffff, 30);
    percentText.weight = '700';
    percentText.dropShadow = true;
    percentText.shadowAlpha = 0.6;
    percentText.shadowBlur = 3;
    percentText.shadowDistanceX = 0.5;
    percentText.y = 1;

    this.add(percentText);
  }

  drawBars() {
    const { _totalWidth: totalWidth, _totalHeight: totalHeight, _bar: bar, _bg: bg, _currentValue: currentValue } = this;

    bg.beginPath();
    bg.fillStyle(this._darkColor);
    bg.lineStyle(10, 0x2cc708);
    bg.roundedRect(-totalWidth / 2, -totalHeight / 2, totalWidth, totalHeight, totalHeight * 0.5);
    bg.stroke();
    bg.fill();

    bar.beginPath();
    bar.fillStyle(this._barColor, 1);
    bar.roundedRect(-totalWidth / 2, (-totalHeight - 1) / 2, totalWidth, totalHeight + 2, totalHeight * 0.5);
    bar.fill();

    bar.clipRect = new Rectangle(-totalWidth / 2, -totalHeight / 2, totalWidth * currentValue, totalHeight);
    bar.visible = currentValue > 0;
  }

  updatePercentText() {
    const percentText = this._percentText;
    percentText.text = (this._currentValue * 100).toFixed(0) + '%';
    // Localization.fitText(percentText, this.totalWidth * 0.1, this.totalHeight * 0.85);
    percentText.alignPivotOffset(1, 0.5);
  }

  onUpdate() {
    const dt = Black.time.delta;

    if (this._currentValue < this._targetValue) {
      this._currentValue += this._interpolationSpeed * dt;

      if (this._currentValue >= this._targetValue) {
        this._currentValue = this._targetValue;
      }

      this._bar.visible = this._currentValue > 0;
      this._bar.clipRect = new Rectangle(-this._totalWidth / 2, -this._totalHeight / 2, this._totalWidth * this._currentValue, this._totalHeight);

      this._percentText.x = -this._totalWidth * 0.5 + this._totalWidth * this._currentValue;
      this.updatePercentText();
    }

    if (!this._isBared && this._currentValue >= 1) {
      this._isBared = true;
    }
  }
}
