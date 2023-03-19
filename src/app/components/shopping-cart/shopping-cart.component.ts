import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth.service';
import { CartService } from 'src/app/services/Cart.service';
import { HistoryService } from 'src/app/services/History.service';
import { TripsService } from 'src/app/services/Trips.service';

import { Trips} from '../../../models/model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  constructor( private cartService: CartService,
    public tripService: TripsService,
    public historyService: HistoryService,
    public auth: AuthService){}

  cartArr:Trips[] = []

  ngOnInit(): void {
    this.auth.getCurrentUserData().then(res =>{
      console.log(res)
    })
    console.log(this.auth.userData.uid)
    this.cartArr = this.cartService.getCart()
  }
  buyTrip(trip:Trips){
    this.tripService.buyTrip(trip)
    this.tripService.addHistory(trip, this.auth.userData.uid)
    this.historyService.setHistory(trip)
    this.deleteTrip(trip)
    this.cartArr = this.cartService.getCart()
  }

  deleteTrip(trip:Trips){
    this.cartService.deleteFromCart(trip)
  }

  

}
