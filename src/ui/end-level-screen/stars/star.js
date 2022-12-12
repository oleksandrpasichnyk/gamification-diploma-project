import { DisplayObject, Ease, Sprite, Tween } from "black-engine";

export default class Star extends DisplayObject {
  // private emptyImage: Sprite;
  
  constructor() {
    this._filledImage = null;

    super();
  }

  empty() {
    this._filledImage.visible = false;
  }

  fill(withAnimation = true) {
    const filledImage = this._filledImage;
    filledImage.visible = true;

    if(!withAnimation) {
      return;
    }

    filledImage.scale = 2;

    const tween = new Tween({
      scale: 1,
    },
      0.2, {
      playOnAdded: true,
      removeOnComplete: true,
      ease: Ease.cubicIn,
    });

    filledImage.addComponent(tween);
  }

  onAdded() {
    // const emptyImage = this.emptyImage = new Sprite('assets/star_empty');
    const emptyImage = new Sprite('assets/star_empty');
    this.add(emptyImage);
    emptyImage.alignPivotOffset();

    const filledImage = this._filledImage = new Sprite('assets/star_filled');
    this.add(filledImage);
    filledImage.alignPivotOffset();
    filledImage.visible = false;
  }
}
