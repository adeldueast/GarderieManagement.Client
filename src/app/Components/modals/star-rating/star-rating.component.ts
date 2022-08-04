import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input('rating') public rating!: number ;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';

  @Output() private ratingUpdated = new EventEmitter();

  @Input() index?:number;

  public ratingArr:number[] = [];

  @Input() isAllowedEdit?:boolean;
  constructor() { }

  ngOnInit() {  
   // console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating:number) {
    if(!this.isAllowedEdit){
      return;
    }

    //console.warn('editing rating');
    
    const emitValue = {
      rating:rating,
      index: this.index

    }
    this.ratingUpdated.emit(emitValue);
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
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}