import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripsService } from 'src/app/services/Trips.service';
import { Trips } from 'src/models/model';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'
  ]
})
export class StarRatingComponent {
  @Input() tripId: number

  constructor(private tripsService: TripsService) { }
  yourRating:number = 0
  changeArr: Boolean[] = [false,false,false,false,false]
  
  rateWithStar(val:number){
    this.yourRating = val
    this.changeArr = [false,false,false,false,false]
    for(let i = 0; i < val; i++){
      this.changeArr[i] = !this.changeArr[i]
    }
    this.tripsService.rateTrip(this.tripId, val)
  

  }

}


