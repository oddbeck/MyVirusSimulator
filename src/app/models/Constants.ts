export class Constants {
  public static SCREEN_WIDTH = 600;
  public static SCREEN_HEIGHT = 600;
  public static getRandomInt(): number {
    let num = Math.floor(Math.random() * 1000) % this.SCREEN_WIDTH - 5;
    while (num < 5) {
      num = Math.floor(Math.random() * 1000) % this.SCREEN_HEIGHT - 5;
    }
    return num;
  }

  public static getRandomMovementVector(): number {
    if (Math.random() >= 0.5) {
      return Math.random() * -1;
    }
    else {
      return Math.random();
    }
  }

  public static dec2hex(d: number): string {
    let str = (+d).toString(16);
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }

  public static generateColorString(red: number, green: number, blue: number): string {
    return '#' + Constants.dec2hex(red) + Constants.dec2hex(green) + Constants.dec2hex(blue);
  }
}
