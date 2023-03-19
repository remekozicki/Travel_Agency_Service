import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CartService } from './Cart.service';
import { TripsService } from './Trips.service';
import { Roles, User } from '../../models/User';
import { Observable } from 'rxjs';
import { Trips } from 'src/models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  userRoles: Roles = {
    guest: true,
    admin: false,
    menager: false,
    client: false,
    banned:false
  }

  persistenceSetting: string = 'local';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private tripService: TripsService,
    private cartService: CartService
  ) {
    afAuth.authState.subscribe(async(ev: any) =>{
      // console.log(this.userRoles);
      // console.log(this.isLoggedIn());
      // console.log(this.userData);
      // console.log(' ');
      if (ev) {
        this.userData = ev;
        const roles = await this.tripService.getUserRoles(ev?.uid);
        this.userRoles = roles as Roles;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          menager: false,
          client: false,
          banned:false
  
        };
      }
    })
  }

  signInEmailPass(email: string, password: string) {
    return this.afAuth.setPersistence(this.persistenceSetting).then((_) => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((ev) => {
          this.router.navigate(['dashboard']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  signUpEmailPass(email: string, password: string, userName: string,) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userData = new User(res.user);
        userData.userName = userName;
        
        this.tripService.addNewUser(userData);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  getCurrentUserData() {
    return this.afAuth.currentUser;
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  signOut() {
    return this.afAuth.signOut().then((ev) => {
      this.cartService.cartArr = []
      this.router.navigate(['']);
    });
  }

  isLoggedIn() {
    return this.userData != null;
  }

  changePersistence(newSetting: string) {
    this.persistenceSetting = newSetting;
  }
  usersArr: User[] =[]
  setUsersArr(users: User[]){
    this.usersArr = users
  }

  getUsersArr(){
    return this.usersArr
  }





}
