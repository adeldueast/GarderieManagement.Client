import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emotion-rating',
  templateUrl: './emotion-rating.component.html',
  styleUrls: ['./emotion-rating.component.css'],
})
export class EmotionRatingComponent implements OnInit {
  
  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';

  @Output() private ratingUpdated = new EventEmitter();


  public ratingArr:number[] = [];

  constructor() { }

  ngOnInit() {
    // console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating:number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
