import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { HistoryService } from 'src/app/services/History.service';
import { TripsService } from 'src/app/services/Trips.service';
import { UserService } from 'src/app/services/User.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'
  ]
})
export class AdminDashboardComponent {
  constructor(
    public tripService: TripsService,
    public historyService: HistoryService,
    public datePipe: DatePipe,
    public auth: AuthService,
    public userService: UserService,
    public afAuth: AngularFireAuth
  ){}

  users: User[] = [];
  usersSub: Subscription | undefined;
  ngOnInit(): void {
    this.auth.getCurrentUserData().then(res =>{})
    this.usersSub = this.tripService.getUsers().subscribe((usersT) => {
      this.users = [];
      for (let user of usersT) {
        console.log(user.roles)
        this.users.push({
          uId: user.uId,
          email: user.email,
          userName: user.userName,
          roles: user.roles
        });
        console.log(this.users)
      }
    });
    
  }

}
