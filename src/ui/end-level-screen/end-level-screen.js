import ResultBoard from "./result-board";
import { Black, DisplayObject } from 'black-engine';

export default class EndLevelScreen extends DisplayObject {
  constructor() {
    super();

    this._totalWidth = 500;
    this._totalHeight = 600;
    this._hasOverlay = false;
  
    this._resultBoard = null;
    this._buttonsGroup = null;

    this.touchable = true;
    this.init();
  }

  setResult(resultData) {
    this.resultBoard.setResult(resultData);
    // this.buttonsGroup.setResult(resultData.isWin);
  }

  show() {
    this.visible = true;
    this.resultBoard.show();
    // setTimeout(() => {
    //   this.buttonsGroup.show()
    // }, 300);
  }

  onResize() {
    const { buttonsGroup } = this;
    const bounds = Black.stage.bounds;

    this.x = bounds.center().x;
    this.y = bounds.center().y;
    // buttonsGroup.y = popup.y + popup.height * 0.5 + 100;
  }

  init() {
    this._initResultBoard();
    this._initButtons();

    this.onResize();

    // setTimeout(() => {
    //   const resultData = {
    //     isWin: true,
    //     killsCount: 12,
    //     ballsCount: 31,
    //     levelNumber: 1,
    //     starsCount: 3,
    //     levelProgress: 1,
    //   };

    //   this.setResult(resultData);
    //   this.show();
    // }, 1000);
  }

  _initResultBoard() {
    const resultBoard = this.resultBoard = new ResultBoard(this.totalWidth, this.totalHeight);
    this.add(resultBoard);
  }

  _initButtons() {
    // const buttons = this.buttonsGroup = new EndLevelButtons();
    // this.add(buttons);

    // buttons.on(END_LEVEL_SCREEN_EVENTS.onMapClicked, () => this.post(END_LEVEL_SCREEN_EVENTS.onMapClicked));
    // buttons.on(END_LEVEL_SCREEN_EVENTS.onNextClicked, () => this.post(END_LEVEL_SCREEN_EVENTS.onNextClicked));
    // buttons.on(END_LEVEL_SCREEN_EVENTS.onRetryClicked, () => this.post(END_LEVEL_SCREEN_EVENTS.onRetryClicked));
  }
}
