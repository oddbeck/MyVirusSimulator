import { Constants } from './Constants';
import { HelperFunctions } from './HelperFunctions';

export class Square{
  myColor = '';
  red = 0;
  green =  0;
  blue = 0;
  xAdjust = 0;
  yAdjust = 0;
  x = 0;
  y = 0;
  moveCounter = 0;
  infectionRate = 0;
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
    this.infectionRate = Constants.generateInfectionRate();
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
    if (this.y >= Constants.SCREEN_HEIGHT - Constants.VIRUS_BOX_SIZE ) {
      this.y -= 1;
      this.yAdjust *= -1;
    }
    if (this.x <= 1 ) {
      this.x += 1;
      this.xAdjust *= -1;
    }
    if (this.x >= Constants.SCREEN_WIDTH - Constants.VIRUS_BOX_SIZE ) {
      this.x -= 1;
      this.xAdjust *= -1;
    }
    this.moveCounter++;
    // we use the move-counter in order to decide if we should "infect" (or replicate)
    if (this.moveCounter > this.infectionRate) {
      this.moveCounter = 0;
      const copy = new Square(this.x, this.y);
      copy.xAdjust = Constants.getRandomMovementVector();
      copy.yAdjust = Constants.getRandomMovementVector();
      copy.infectionRate = this.generateInfectionRate();
      copy.myColor = this.generateNewColorWithinSameSpecter();
      copy.red = this.red;
      copy.blue = this.blue;
      copy.green = this.green;
      this.repliTotalCount++;
      // we don't want this to replicate forever, so they die after 20 replications...
      if (this.repliTotalCount > 20) {
        this.isDead = true;
      }
      return copy;
    }
    return null;
  }

  generateNewColorWithinSameSpecter(): string {

    let red = this.red;
    let green = this.green;
    let blue = this.blue;

    // if we're red we tweak our color within the red gradients
    if (red > 0 ) {
      red = Constants.getRandomInt() % 50;
      red = red + 180;
    }
    // and if we're green we tweak it within the green gradients
    if (green > 0 ) {
      green = Constants.getRandomInt() % 50;
      green = green + 180;
    }
    // same goes if we're blue...
    if (blue > 0 ) {
      blue = Constants.getRandomInt() % 50;
      blue = blue + 180;
    }
    return Constants.generateColorString(red, green, blue);
  }

  getMyColorString(): string {
    return Constants.generateColorString(this.red, this.green, this.blue);
  }
  setMyColorString(): void {
    this.myColor = Constants.generateColorString(this.red, this.green, this.blue);
  }
}