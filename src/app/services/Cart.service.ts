import { Injectable } from "@angular/core";
import { Trips } from "../../models/model";



@Injectable({
    providedIn: 'root'
})

export class CartService {
    
    constructor(){}

    cartArr: Trips[] = []

    setCart(trips: Trips[]){
        this.cartArr = trips
    }

    getCart(): Trips[]{
        return this.cartArr
    }

    deleteFromCart(trip:Trips){
        for(let i = 0; i< this.cartArr.length; i++){
            console.log('dziła')
            if(this.cartArr[i].id == trip.id){
                this.cartArr.splice(i,1)
                console.log(this.cartArr)
                // this.sumCosts()
                return
            }
        }

    }

    summaryCost: number;

    sumCost(){
        let tmp = 0
        this.cartArr.forEach(element => {
            tmp += element.pricePerPerson
        });

        this.summaryCost = tmp
        return this.summaryCost
    }

    summaryPeople: number;

    sumPeople(){
        let tmp = 0
        this.cartArr.forEach(element => {
            tmp += element.booked
        });

        this.summaryCost = tmp
        return this.summaryPeople
    }

    howManyInCart(trip:Trips){
        let count = 0
        this.cartArr.forEach(element => {
            if(element.id == trip.id){
                count++
            }
        });
        return count
    }

}   