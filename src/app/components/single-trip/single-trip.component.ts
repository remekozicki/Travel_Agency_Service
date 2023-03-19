import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/Cart.service';
import { TripsService } from 'src/app/services/Trips.service';
import { Opinion, Trips } from 'src/models/model';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.scss'
  ]
})
export class SingleTripComponent implements OnInit{

  constructor(private route: ActivatedRoute,
    private tripsService: TripsService,
    private formBuilder: FormBuilder,
    public cartService: CartService ){}

  private subscription: Subscription | undefined

  id:number = -1;
  trip: Trips
  selected: number = 0;
  modelForm:FormGroup
  cartArr:Trips[] = []

  ngOnInit(): void {
    this.cartArr = this.cartService.getCart()
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
      this.tripsService.getTripsList().pipe(first()).subscribe((changes:any[]) =>{
        for (let t of changes){
          if(t.id == this.id){
              this.trip = t
              console.log(this.trip)
          }
        }
      })
    })

    this.modelForm = this.formBuilder.group({
      fopinion: new FormControl('',[Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
      fpurchaseDate: new FormControl('')
    })
  }


  opinionsArr: Opinion[] = []
  onSubmit( form: FormGroup): void{
    let newPost : Opinion = {
      nick: 'YourNick',
      tripName: this.trip.name,
      opinionContent: this.modelForm.value.fopinion,
      purchaseDate: this.modelForm.value.fpurchaseDate
    }

    this.opinionsArr.push(newPost)
    this.modelForm.reset()
  }

  book(trip:Trips){
    this.cartArr.push(trip)
    this.cartService.setCart(this.cartArr)
    console.log(this.cartArr)

  }

  unbook(trip: Trips){
    this.cartService.deleteFromCart(trip)
  }

  disablePlus(trip:Trips){
    return !((trip.maxPeople - this.cartService.howManyInCart(trip)) > 0)
  }

  disableMinus(trip:Trips){
    return !(this.cartService.howManyInCart(trip) > 0)
  }
    
  

}
