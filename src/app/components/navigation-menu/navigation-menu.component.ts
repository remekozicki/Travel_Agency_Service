import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { TripsService } from 'src/app/services/Trips.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'
  ]
})
export class NavigationMenuComponent {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public auth: AuthService,
    private tripService: TripsService
  ){}
  
  userName:string = ''
  onLogout(){
    this.afAuth.signOut()
    this.router.navigate(['homepage'])
    this.userName = ''
    
  }
  usersArr:User[] = []
  usersSub: Subscription | undefined
  ngOnInit(): void {
    this.usersSub = this.tripService.getUsers().subscribe(changes =>{
      this.usersArr = []
      for (let user of changes){
        this.usersArr.push({
          uId: user.uId,
          email: user.email,
          userName: user.userName,
          roles: user.roles,
          
        })
      }
      this.auth.setUsersArr(this.usersArr)
      console.log(this.usersArr)
      this.getNick()
      console.log(this.userName)
    })
    
  }
  getNick(){
    if(this.auth.userRoles?.client != true){
      this.userName = ''
      return this.userName
    }
    this.usersArr.forEach(element => {
      if (element.email == this.auth.userData.email){
        this.userName = element.userName
        
      }
    });
    return this.userName
  }

  
}
