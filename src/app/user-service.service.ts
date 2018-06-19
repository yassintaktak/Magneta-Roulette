import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userData:any = {
    user_name : "Yassin_Tak",
    user_balance : 540,
    user_last_win : 0,
    user_total_win : 0,
    user_total_bet : 0
  }
  constructor() { }

  getUserData(data:string):string {
    return this.userData[data];
  };
  setUserData(data:string, value:string):void {
    this.userData[data] = value;
  }
}
