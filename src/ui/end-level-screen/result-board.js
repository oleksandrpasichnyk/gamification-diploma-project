import { DisplayObject, Ease, Graphics, Sprite, TextField, Tween } from "black-engine";
import GATES_CONFIG from "../../game/data/gates-config";
import TextIconButton from "../button/text-button";
// import Localization from "../../core/localization/localization";
import EndLevelProgressBar from "./progress-bar/end-level-progress-bar";
import Stars from "./stars/stars";

export default class ResultBoard extends DisplayObject {
  constructor(totalWidth = 500, totalHeight = 800) {
    super();

    this._titleText = null;
    this._subtitleText = null;
    this._correctCounterText = null;
    this._mistakesCounterText = null;
    this._stars = null;
    this._progressBar = null;
  
    this._totalWidth = totalWidth;
    this._totalHeight = totalHeight;

    this.visible = false;
    this.touchable = true;
    this.init();
  }

  setResult(data) {
    const { correctCount, mistakesCount, totalCount, mistakes } = data;

    const levelProgress = correctCount/totalCount;
    const isWin = levelProgress > 0.65;

    this._setTitleText(isWin);
    this._setSubtitleText(1, isWin);
    // this._setStartsCount(data.starsCount);
    this._setCountersText(correctCount, mistakesCount);
    this._setMistakesText(mistakes);

    this._progressBar.visible = true;
    this._progressBar.setProgress(levelProgress);
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

  init() {
    this._initBg();
    this._initTitle();
    this._initSubtitleText();
    this._initProgressBar();
    this._initCounters();
    this._initMistakesText();
    this._initButton();
    // this._initStars();
  }

  _initBg() {
    const bg = this._bg = new Graphics();
    bg.beginPath();
    bg.fillStyle(0xffffff);
    bg.lineStyle(10, 0x2cc708);
    bg.roundedRect(0, 0, this._totalWidth, this._totalHeight, 20);
    bg.closePath();
    bg.fill();
    bg.stroke();

    bg.alignPivotOffset();

    this.add(bg);
  }

  _initTitle() {
    const title = new DisplayObject();

    const titleBg = new Graphics();
    titleBg.beginPath();
    titleBg.fillStyle(0x62f241);
    titleBg.lineStyle(10, 0x2cc708);
    titleBg.roundedRect(0, 0, this._totalWidth * 0.6, 80, 20);
    titleBg.closePath();
    titleBg.fill();
    titleBg.stroke();

    titleBg.alignPivotOffset();
    
    const titleText = this._titleText = new TextField('VICTORY', 'Arial', 0x333333, 45);
    titleText.alignAnchor();
    titleText.weight = '600';
    titleText.y = 5;

    title.add(titleBg);
    title.add(titleText);
    this.add(title);

    title.y = -this._totalHeight * 0.5;
  }

  _setTitleText(isWin) {
    this._titleText.text = isWin ? 'ПЕРЕМОГА' : 'ПОРАЗКА';
    // Localization.fitText(this.titleText, this.totalWidth * 0.5, 100);
    this._titleText.alignAnchor();
  }

  _initSubtitleText() {
    const subtitleText = this._subtitleText = new TextField('', 'Arial', 0x333333, 45);
    subtitleText.weight = '500';
    subtitleText.alignAnchor();
    this.add(subtitleText);
    subtitleText.y = -this._totalHeight * 0.5 + 100;

    this._setSubtitleText(10, true);
  }

  _setSubtitleText(levelNumber, isWin) {
    const subtitleText = this._subtitleText;
    subtitleText.text = 'Рівень ' + levelNumber + ' ' + (isWin ? 'пройдено' : 'не пройдено');
    // Localization.fitText(subtitleText, this.totalWidth * 0.8, 100);
    subtitleText.alignAnchor(0.5);

    subtitleText.y = -this._totalHeight * 0.5 + (isWin ? 130 : 100);
  }

  _initProgressBar() {
    const progressBar = this._progressBar = new EndLevelProgressBar();
    this.add(progressBar);
    progressBar.y = -this._totalHeight * 0.5 + 210;
    progressBar.visible = false;
  }

  _initCounters() {
    const { counter: correctCounter, counterText: correctCounterText } = this._createCounter('правильних відповідей', 0x62f241);
    const { counter: mistakesCounter, counterText: mistakesCounterText } = this._createCounter('помилок', 0xf24156);

    this.add(correctCounter);
    this.add(mistakesCounter);

    correctCounter.x = mistakesCounter.x = -this._totalWidth * 0.5 + 70;
    correctCounter.y = -120;
    mistakesCounter.y = correctCounter.y + 75;

    this._correctCounterText = correctCounterText;
    this._mistakesCounterText = mistakesCounterText;
  }

  _setCountersText(correct, mistakes) {
    const { _correctCounterText: correctCounterText, _mistakesCounterText: mistakesCounterText } = this;
    correctCounterText.text = correct.toString();
    mistakesCounterText.text = mistakes.toString();
    correctCounterText.alignPivotOffset();
    mistakesCounterText.alignPivotOffset();
  }

  _createCounter(text, bgColor) {
    const counter = new DisplayObject();

    const bg = new Graphics();
    bg.beginPath();
    bg.fillStyle(bgColor);
    bg.circle(0, 0, 30);
    bg.fill();
    bg.alignPivotOffset();

    const counterText = new TextField('10', 'Arial', 0x444444, 24);
    counterText.weight = '600';
    counterText.alignPivotOffset();
    counterText.x = -0.5;
    counterText.y = 3;

    const descriptionText = new TextField(text, 'Arial', 0x444444, 30);
    // Localization.fitText(descriptionText, this.totalWidth * 0.65, 100);

    descriptionText.alignAnchor(0, 0.5);
    descriptionText.x = 45;
    descriptionText.y = 4;

    counter.add(bg);
    counter.add(counterText);
    counter.add(descriptionText);
    
    return { counter, counterText };
  }

  _initMistakesText() {
    const mistakesText = this._mistakesText = new TextField('text\nertggte\nertgertgert', 'Arial', 0xf24156, 24);
    const correctText = this._correctText = new TextField('text\nertggte\nertgertgert', 'Arial', 0x62f241, 24);
    mistakesText.align = 'right';

    mistakesText.multiline = true;
    correctText.multiline = true;

    mistakesText.alignPivotOffset(1, 0);
    correctText.alignPivotOffset(0, 0);

    this.add(mistakesText);
    this.add(correctText);
    
    const distance = 10;
    mistakesText.x = -distance * 0.5;
    correctText.x = distance * 0.5;
    mistakesText.y = correctText.y = 10;
  }

  _setMistakesText(mistakes) {
    let mistakesString = '';
    let correctString = '';

    mistakes.forEach(mistake => {
      mistakesString += mistake + '\n';
      const data = GATES_CONFIG.find(data => data.uncorrectAnswer === mistake);
      correctString += data.correctAnswer + '\n';
    });

    this._mistakesText.text = mistakesString;
    this._correctText.text = correctString;

    this._mistakesText.alignPivotOffset(1, 0);
    this._correctText.alignPivotOffset(0, 0);
  }

  _initStars() {
    const stars = this._stars = new Stars();
    this.add(stars);
    stars.y = 180;
  }

  _initButton() {
    const button = new TextIconButton(null, 'ДАЛІ');
    this.add(button);

    button.y = this._totalHeight * 0.5 - 100;
    button.on('onClick', () => {
      console.log('onClick');
    });
  }

  _setStartsCount(count) {
    this._stars.setCount(count);
  }
}