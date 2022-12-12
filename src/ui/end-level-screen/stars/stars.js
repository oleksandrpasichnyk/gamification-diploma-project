import { DisplayObject } from "black-engine";
import Star from "./star";

export default class Stars extends DisplayObject {
  
  constructor() {
    super();
    
    this._starsPool = [];
  }

  setCount(count, withAnimation = true) {
    for (let i = 0; i < count; i++) {
      this._starsPool[i].empty();
      setTimeout(() => {
        this._starsPool[i].fill(withAnimation)
      }, withAnimation ? (500 * (i + 1)) : 10);
    }
  }

  onAdded() {
    const count = 3;
    const distance = 150;

    for (let i = 0; i < count; i++) {
      const star = new Star();
      this.add(star);
      this._starsPool.push(star);
      star.x = distance * (i - 1);
      star.scale = 1.7;
      star.rotation = 0.35 * (i - 1);

      if(i === 1) {
        star.y = -25;
      }
    }
  }
}