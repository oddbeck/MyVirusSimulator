import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Square } from 'src/app/models/Square';
import { Constants } from '../../models/Constants';

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

  height;
  width;

  @Input()
  squaresCount: number;

  squaresList: Square[] = [];

  private ctx: CanvasRenderingContext2D;
  private progressCtx: CanvasRenderingContext2D;

  constructor() {
    debugger;
    this.height = 600;
    this.width = this.height;
    const redSquare = new Square(Constants.getRandomInt(), Constants.getRandomInt());
    const greenSquare = new Square(Constants.getRandomInt(), Constants.getRandomInt());
    const blueSquare = new Square(Constants.getRandomInt(), Constants.getRandomInt());
    redSquare.red = 255; redSquare.blue = redSquare.green = 0;
    blueSquare.blue = 255; blueSquare.red = blueSquare.green = 0;
    greenSquare.green = 255; greenSquare.red = greenSquare.blue = 0;

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
    let x = Constants.getRandomInt();
    let y = Constants.getRandomInt();

    let square = new Square(x, y);

    while (!this.findMatch(square))
    {
      x = Constants.getRandomInt();
      y = Constants.getRandomInt();
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
    this.progressCtx.clearRect(0, 0, this.height, this.height);
    this.progressCtx.fillStyle = 'orange';
    this.progressCtx.fillRect(0, 0, (this.squaresCount / 5000) * 100, 14);
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
        this.ctx.fillStyle = square.mainColor;
        this.ctx.fillRect(square.x, square.y, square.width, square.height);
        }
    }

    if (squaresLength > 30000) {
      clearInterval(this.drawInterval);
      clearInterval(this.moveInterval);
    }
  }
}
