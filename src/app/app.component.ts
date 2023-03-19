import { Component } from '@angular/core';
import { Trips } from 'src/models/model';
import { CartService } from './services/Cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public cartService: CartService){}

  cartArr:Trips[] = []

    ngOnChanges(): void {
      this.cartArr = this.cartService.getCart()
    }
}
