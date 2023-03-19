import { Injectable } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public auth: AuthService
  ) { }
  usersArr:User[] = []
  userID: string
  getID(Arr:User[]){
    Arr.forEach(element => {
      if (element.email == this.auth.userData.email){
        this.userID = element.uId
      }
    });
    return this.userID
  }
}
