import { Constants } from './Constants';
export class Square{
  mainColor = '';
  red = 0;
  green =  0;
  blue = 0;
  xAdjust = 0;
  yAdjust = 0;
  x = 0;
  y = 0;
  width = 5;
  height = 5;
  repliCounter = 0;
  repliLimit = 0;
  isDead = false;
  repliTotalCount = 0;
  constructor(x: number , y: number) {
    this.x = x;
    this.y = y;
    this.xAdjust = Math.random();
    this.yAdjust = Math.random();
    // randomly set the direction it's gonna move on the x axis
    if (Math.random() > 0.5) {
      this.xAdjust = this.xAdjust * -1;
    }
    // randomly set the direction it's gonna move on the y axis
    if (Math.random() > 0.5) {
      this.yAdjust = this.yAdjust * -1;
    }
    this.repliLimit = this.generateRepliLimit();
  }


  generateRepliLimit(): number {
    return (Constants.getRandomInt() % 170) + 10;
  }
  adjustItem() {
    if (this.isDead) {
      return;
    }
    this.x += this.xAdjust;
    this.y += this.yAdjust;
    if (this.y <= 1 ) {
      this.y += 1;
      this.yAdjust *= -1;
    }
    if (this.y >= Constants.SCREEN_HEIGHT - this.height ) {
      this.y -= 1;
      this.yAdjust *= -1;
    }
    if (this.x <= 1 ) {
      this.x += 1;
      this.xAdjust *= -1;
    }
    if (this.x >= Constants.SCREEN_WIDTH - this.height ) {
      this.x -= 1;
      this.xAdjust *= -1;
    }
    this.repliCounter++;
    if (this.repliCounter > this.repliLimit) {
      this.repliCounter = 0;
      let copy = new Square(this.x, this.y);
      copy.xAdjust = Constants.getRandomMovementVector();
      copy.yAdjust = Constants.getRandomMovementVector();
      copy.repliLimit = this.generateRepliLimit();
      copy.mainColor = this.tweakColor();
      copy.red = this.red;
      copy.blue = this.blue;
      copy.green = this.green;
      this.repliTotalCount++;
      if (this.repliTotalCount > 20) {
        this.isDead = true;
      }
      return copy;
    }
    return null;
  }

  tweakColor(): string {

    let red = this.red;
    let green = this.green;
    let blue = this.blue;

    debugger;
    if (red > 0 ) {
      debugger;
      red = Constants.getRandomInt() % 50;
      red = red + 180;
    }
    if (green > 0 ) {
      debugger;
      green = Constants.getRandomInt() % 50;
      green = green + 180;
    }
    if (blue > 0 ) {
      debugger;
      blue = Constants.getRandomInt() % 50;
      blue = blue + 180;
    }
    return Constants.generateColorString(red, green, blue);
  }

  setMyColorString(): void {
    this.mainColor = Constants.generateColorString(this.red, this.green, this.blue);
  }
}
