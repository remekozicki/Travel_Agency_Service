import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { CartService } from 'src/app/services/Cart.service';
import { TripsService } from 'src/app/services/Trips.service';
import { Trips,} from 'src/models/model';
@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnInit{

  searchname:string
  searchid:number
  cartArray: Trips[] = []
  
  constructor(public tripsService: TripsService,
    public cartService: CartService,
    public auth: AuthService) { }
  trips:Trips[] = []
  
// firebase
  
  tripsSub: Subscription | undefined
  ngOnInit(): void {
    this.tripsSub = this.tripsService.getTripsList().subscribe(changes =>{
      this.trips = []
      for (let trip of changes){
        this.trips.push({
            id: trip.id,
            name: trip.name,
            destiny: trip.destiny,
            startDate: trip.startDate,
            endDate: trip.endDate,
            pricePerPerson: trip.pricePerPerson,
            maxPeople: trip.maxPeople,
            booked: trip.booked,
            description: trip.description,
            img: trip.img,
            link: trip.link,
            rating: trip.rating
        })
      }
      console.log(this.trips)
      this.maxMinPrice()
    })
    this.cartArray = []
  }

  ngOnDestroy(): void {
      this.tripsSub?.unsubscribe()
  }


// end firebase

  disablePlus(trip:Trips){
    if (this.auth.userRoles?.client != true) {
      // window.alert('Dostępne tylko dla zalogowanych')
      return true;
    }
    return !((trip.maxPeople - this.cartService.howManyInCart(trip)) > 0)
  }

  disableMinus(trip:Trips){
    if (this.auth.userRoles?.client != true) {
      // window.alert('Dostępne tylko dla zalogowanych');
      return true;
    }
    return !(this.cartService.howManyInCart(trip) > 0)
  }

  // allBooked = 0
  // sumBooked(){
  //   let count = 0
  //   this.trips.forEach(element => {
  //     count += element.booked
  //   });
  //   this.allBooked = count
    
  // }

  book(trip:Trips){
    this.cartArray.push(trip)

    // this.sumCosts()
    // this.tripsService.bookTrip(trip.id, tb, tpm)
    this.cartService.setCart(this.cartArray)
    console.log(this.cartArray)

  }

  unbook(trip: Trips){
    this.cartService.deleteFromCart(trip)
  }
  
  
  highestCost: number
  lowestCost:number

  maxMinPrice(){
    let highestPrice = 0
    let lowestPrice = 10**10
    this.trips.forEach(element => {
      
      if(element.maxPeople > 0){

        if(highestPrice < element.pricePerPerson){
          highestPrice = element.pricePerPerson
        }
        if(lowestPrice > element.pricePerPerson){
          lowestPrice = element.pricePerPerson
        }
      }
    });
    console.log(highestPrice)
    console.log(lowestPrice)
    this.highestCost = highestPrice
    this.lowestCost = lowestPrice

  }

  deleteTrip(idx:number){
    if (this.auth.userRoles?.menager == true) {
    this.tripsService.deleteTrip(idx)
    }
  }

  showForm = false;

  openForm(){
    this.showForm = !this.showForm
  }

  closeForm(bool:boolean){
    this.showForm = bool
  }
  

  // summary:number
  // sumCosts(){
  //   let tmpSum = 0
  //   this.cartArray.forEach(element => {
  //     tmpSum += element.pricePerPerson
  //   });

  //   this.summary =  tmpSum
  // }

  filters:string[] = []
  changeFilters(fArr:string[]){
    this.filters = fArr
    // console.log(fArr)
  }

  

}
