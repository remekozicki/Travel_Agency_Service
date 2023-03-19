import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trips } from '../../../models/model';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'
  ]
})
export class FilteringComponent {
  
  @Input() maxPrice:number
  @Input() minPrice:number
  @Input() Trips:Trips[] = []
  @Output() filtersEmitter = new EventEmitter<string[]>()

  
  countrySearch:string = 'wszystkie'
  startDateSearch:string = ''
  endDateSearch:string = ''
  minPriceSearch:number = 0
  maxPriceSearch:number = 10000
  ratingSearch:number = -1

  changeArr: Boolean[] = [false,false,false,false,false]
  rateWithStar(val:number){

    if(val == 1 && this.changeArr[0] == true && this.changeArr[1] == false){
      this.changeArr = [false,false,false,false,false]
      this.ratingSearch = 0
      this.updateFilters()
      return
    }

    this.changeArr = [false,false,false,false,false]
    for(let i = 0; i < val; i++){
      this.changeArr[i] = !this.changeArr[i]
    }
    this.ratingSearch = val
    this.updateFilters()
  }

  

  updateFilters(){
    let filtersArray:string[] = [this.countrySearch, this.startDateSearch,this.endDateSearch,this.minPriceSearch.toString(),this.maxPriceSearch.toString(),this.ratingSearch.toString()]
    this.filtersEmitter.emit(filtersArray)
  }
}
