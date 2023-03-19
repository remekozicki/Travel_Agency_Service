import { Trips } from "./model";

export class User{
    uId: string;
    email: string;
    userName: string;
    roles: Roles;
    

    constructor(userData: any) {
        this.email = userData.email;
        this.uId = userData.uid;
        if (userData.roles != null) {
          this.roles = userData.roles;
        } else
          this.roles = {
            client: true,
            guest: true,
            menager: false,
            admin: false,
            banned: false
          };
      }


}

export interface Roles {
    guest: boolean;
    client: boolean;
    menager: boolean;
    admin: boolean;
    banned: boolean;


}