import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { HistoryService } from 'src/app/services/History.service';
import { TripsService } from 'src/app/services/Trips.service';
import { UserService } from 'src/app/services/User.service';
import { Trips } from 'src/models/model';
import { User } from 'src/models/User';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'
  ]
})
export class MyProfileComponent {

  constructor(
    public tripService: TripsService,
    public historyService: HistoryService,
    public datePipe: DatePipe,
    public auth: AuthService,
    public userService: UserService,
    public afAuth: AngularFireAuth
  ){
    
  }
  
  userID: string
  usersArr:User[] = []
  myDate:any = new Date()
  historyArr:Trips[] =[];
  tmp:string[] = []
  tripsSub: Subscription | undefined
  ngOnInit(): void {
    this.auth.getCurrentUserData().then(res =>{})
    console.log(this.auth.userData.uid)

    // this.tripsSub = this.tripService.getHistory(this.auth.userData.uid).subscribe(changes =>{
    //   this.historyArr = []
    //   // for (let trip of changes){
    //   //   this.historyArr.push({
    //   //       id: trip.id,
    //   //       name: trip.name,
    //   //       destiny: trip.destiny,
    //   //       startDate: trip.startDate,
    //   //       endDate: trip.endDate,
    //   //       pricePerPerson: trip.pricePerPerson,
    //   //       maxPeople: trip.maxPeople,
    //   //       booked: trip.booked,
    //   //       description: trip.description,
    //   //       img: trip.img,
    //   //       link: trip.link,
    //   //       rating: trip.rating
    //   //   })
    //   // }
    //   console.log(changes)
      
    // })

    // this.tripService.getHistory(this.auth.userData.uid).pipe(first()).subscribe((data:any)=>{
    //   if(data){
    //     this.tmp = Object.keys(data)
    //     this.historyArr = data
    //     console.log(this.historyArr)
    //     console.log(this.tmp)
        
    //   }

    //   // for (let i of data){
    //   //   // this.historyArr.push(i.payload.val().history)
    //   //   console.log(i.payload.val().history)
    //   // }
    //   console.log(data)

    // })

    // for(let idx of this.tmp){
    //   console.log(this.historyArr.keys())
    // }
    // console.log(this.historyArr)
    this.historyArr = this.historyService.getHistory()
    this.toDisplay(this.historyArr)
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    this.usersArr = this.auth.getUsersArr()
    // console.log(this.userID)

  }

  toDisplayArr:Trips[] = []
  toDisplay(trips:Trips[]){
    this.historyArr.forEach(history => {
      let flag = true
      this.toDisplayArr.forEach(display => {
        if (history.id == display.id){
          flag = false
        }
        
      });
      if(flag){

        this.toDisplayArr.push(history)
      }
      
    });

  }

  compareDates(item: Trips){
    let date1 : Date = new Date(item.startDate)
    let date2 : Date = new Date(this.myDate)
    return date2.getTime() <= date1.getTime()

  }


 

}


