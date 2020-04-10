import { Constants } from './Constants';

export class HelperFunctions {

  // generates a random int within 0 -> 600 (screen width)
  public static getRandomInt(): number {
    let num = Math.floor(Math.random() * 1000) % Constants.SCREEN_WIDTH - Constants.VIRUS_BOX_SIZE;
    while (num <  Constants.VIRUS_BOX_SIZE ) {
      num = Math.floor(Math.random() * 1000) % Constants.SCREEN_HEIGHT - Constants.VIRUS_BOX_SIZE;
    }
    return num;
  }

  // generate a random vector for where to move.
  public static getRandomMovementVector(): number {
    if (Math.random() >= 0.5) {
      return Math.random() * -1;
    }
    else {
      return Math.random();
    }
  }

  // convert base-10 numeric values to base-16 (hex)
  public static dec2hex(d: number): string {
    let str = (+d).toString(16);
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }

  // static function for generating a color-string from RGB values.
  public static generateColorString(red: number, green: number, blue: number): string {
    return '#' + Constants.dec2hex(red) + Constants.dec2hex(green) + Constants.dec2hex(blue);
  }

  // static function for generating a random infection rate.. all the way from 0 (constantly infecting) up to 170 which is basically never.
  public static generateInfectionRate(): number {
    return (Constants.getRandomInt() % 170) + 10;
  }

}
