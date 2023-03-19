import { Injectable } from "@angular/core";
import { Trips } from "../../models/model";



@Injectable({
    providedIn: 'root'
})

export class HistoryService{
    constructor(){}

    historyArr:Trips[] = []

    setHistory(trip:Trips){
        this.historyArr.push(trip)
    }

    getHistory(){
        return this.historyArr
    }

    countHistory(trip:Trips){
        let counter = 0
        this.historyArr.forEach(element => {
            if(element.id == trip.id){
                counter++
            }
        })
        return counter
    }
}