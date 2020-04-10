import { Component, OnInit, ViewChild, ElementRef, Input, ContentChild } from '@angular/core';
import { Square } from 'src/app/models/Square';
import { Constants } from '../../models/Constants';
import { HelperFunctions } from 'src/app/models/HelperFunctions';

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss']
})
export class MainCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('progressbar', { static: true })
  progressbar: ElementRef<HTMLCanvasElement>;
  @Input()
  squaresCount: number;

  squaresList: Square[] = [];

  infectionRateRedVirus = 0;
  infectionRateBlueVirus = 0;
  infectionRateGreenVirus = 0;

  private ctx: CanvasRenderingContext2D;
  private progressCtx: CanvasRenderingContext2D;

  constructor() {

    const redSquare = new Square(HelperFunctions.getRandomInt(), HelperFunctions.getRandomInt());
    const greenSquare = new Square(HelperFunctions.getRandomInt(), HelperFunctions.getRandomInt());
    const blueSquare = new Square(HelperFunctions.getRandomInt(), HelperFunctions.getRandomInt());

    redSquare.red = 255;
    blueSquare.blue = 255;
    greenSquare.green = 255;

    redSquare.setMyColorString();
    greenSquare.setMyColorString();
    blueSquare.setMyColorString();

    this.squaresList.push(redSquare);
    this.squaresList.push(greenSquare);
    this.squaresList.push(blueSquare);
    this.squaresCount = this.squaresList.length;

  }

  findMatch(square: Square): boolean {
    const arrLen = this.squaresList.length;
    if (arrLen === 0) {
      return true;
    }
    for (let i = 0; i < arrLen; i++) {
      const s = this.squaresList[i];
      const xIsSafe = (square.x > (s.x + 5) ) || ( square.x < s.x - 5);
      const yIsSafe = (square.y > (s.y + 5) ) || ( square.y < s.y - 5);
      if (!xIsSafe && !yIsSafe) {
        return false;
      }
    }
    return true;
  }

  findNontakenSpot(): Square {
    let x = HelperFunctions.getRandomInt();
    let y = HelperFunctions.getRandomInt();

    let square = new Square(x, y);

    while (!this.findMatch(square))
    {
      x = HelperFunctions.getRandomInt();
      y = HelperFunctions.getRandomInt();
      square = new Square(x, y);
    }
    return square;
  }

  drawInterval;
  moveInterval;
  progressInterval;

  ngOnInit(): void {
    this.squaresCount = this.squaresList.length;

    this.drawInterval = setInterval(() => {
      this.drawItems();
    }, 50);
    this.moveInterval = setInterval(() => {
      this.moveItems();
    }, 50);
    this.progressInterval = setInterval(() => {
      this.drawProgressbar();
    });
  }

  drawProgressbar() {
    this.progressCtx = this.progressbar.nativeElement.getContext('2d');
    this.progressCtx.clearRect(1, 0, Constants.SCREEN_HEIGHT, Constants.SCREEN_WIDTH);
    this.progressCtx.fillStyle = 'orange';
    this.progressCtx.fillRect(1, 0, this.squaresCount / (Constants.MAX_VIRUS / Constants.SCREEN_HEIGHT) , 14);
  }


  moveItems() {
    console.log('adjusting items');
    for (let i = 0; i < this.squaresCount; i++) {
      const possibleNew = this.squaresList[i].adjustItem();
      if (possibleNew != null) {
        this.squaresList.push(possibleNew);
        this.squaresCount++;
      }
    }
  }
  drawItems() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    const squaresLength = this.squaresList.length;
    this.ctx.clearRect(0, 0, this.height, this.height);
    for (let i = 0; i < squaresLength; i++) {
      const square = this.squaresList[i];
      if (!square.isDead) {
        this.ctx.fillStyle = square.myColor;
        this.ctx.fillRect(square.x, square.y, Constants.VIRUS_BOX_SIZE, Constants.VIRUS_BOX_SIZE);
        }
    }

    if (squaresLength > Constants.MAX_VIRUS) {
      clearInterval(this.drawInterval);
      clearInterval(this.moveInterval);
    }
  }
  onClick($event) {
    console.log(this.canvas2);
  }
}
