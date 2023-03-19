import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { first, firstValueFrom, Observable } from "rxjs";
import { User } from "src/models/User";
import { Trips } from "../../models/model";



@Injectable({
    providedIn: 'root'
})

export class TripsService {


    tripsRef: Observable<any[]>;
    historyRef: Observable<any[]>
    private nextId: number 
    private dbPath = '/TripsBase';
    usersArr: Observable<any[]>
    constructor(private db: AngularFireDatabase) {
        this.tripsRef = this.db.list(this.dbPath).valueChanges();
        this.db.list(this.dbPath, ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})
        this.usersArr = this.db.list('/users').valueChanges()
    }


    getTripsList(): Observable<any[]>  {
        console.log(this.tripsRef)
        return this.tripsRef;
      }

    createTrip(trip: Trips): any {
        this.db.list(this.dbPath).push({
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
// tu trzeba to zmienić
    deleteTrip(idx:number){
        console.log(idx)
        this.db.list(this.dbPath).snapshotChanges().pipe(first()).subscribe((items:any)=>{
            for(let i of items){
                if(i.payload.val().id == idx){
                    console.log(i.payload.key)
                    this.db.list(this.dbPath).remove(i.payload.key)
                }
            }
        })
        
    }

    buyTrip(trip:Trips){
        
        this.db.list(this.dbPath).snapshotChanges().pipe(first()).subscribe((items:any)=>{
            for(let i of items){
                if(i.payload.val().id == trip.id){
                    
                    let tmpB = i.payload.val().booked
                    let tmpP = i.payload.val().maxPeople
                    console.log(1)
                    this.db.list(this.dbPath).update(i.payload.key, {booked: tmpB+1})
                    this.db.list(this.dbPath).update(i.payload.key, {maxPeople: tmpP-1})
                }
            }
        })

    }

    rateTrip(idx:number, rate: number) {
        console.log(idx)
        this.db.list(this.dbPath).snapshotChanges().pipe(first()).subscribe((items:any)=>{
            for(let i of items){
                if(i.payload.val().id == idx){
                    console.log(i.payload.key)
                    this.db.list(this.dbPath).update(i.payload.key, {rating: rate})
                }
            }
        })
    }

    getNextid(){
        return this.nextId
      }

    addNewUser(user: User){
        this.db.object('/users/' + user.uId).set({
            uId: user.uId,
            email: user.email,
            roles: user.roles,
            userName: user.userName,
            
        })
    }

    async getUserRoles(uid: string){
        return firstValueFrom(
            this.db.object('/users/' + uid + '/roles').valueChanges()
        )
    }

    getUserRoles$(uid: string) {
        return this.db.object('/users/' + uid + '/roles').valueChanges();
    }

    getUsers() {
        return this.usersArr
    }

    addHistory(trip:Trips, uid: string){
        this.db.list('/history/' + uid).push({
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

    getHistory(uid:string){
        // this.historyRef = this.db.object('/history/' + uid).valueChanges()

        return this.db.object('/history/' + uid).valueChanges()
    }

}   