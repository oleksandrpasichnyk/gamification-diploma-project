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
  }

  show() {
    this.visible = true;
    this.resultBoard.show();

  }

  hide() {
    this.resultBoard.hide();
  }

  onResize() {
    const bounds = Black.stage.bounds;

    this.x = bounds.center().x;
    this.y = bounds.center().y;
  }

  init() {
    this._initResultBoard();

    this.onResize();


    setTimeout(() => {
      this.setResult({
        correctCount: 65,
        mistakesCount: 35,
        totalCount: 100,
        mistakes: []
      });

      // this.show();
    }, 1000);
  }

  _initResultBoard() {
    const resultBoard = this.resultBoard = new ResultBoard(this.totalWidth, this.totalHeight);
    this.add(resultBoard);
  }
}
