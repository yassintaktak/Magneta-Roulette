import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-betting-information',
  templateUrl: './betting-information.component.html',
  styleUrls: ['./betting-information.component.css']
})
export class BettingInformationComponent implements OnInit {
  user_name:string = "";
  user_balance:string = "";
  user_last_win:string = "";
  user_total_win:string = "";
  user_total_bet:string = "";
  session_date:string = "";

  constructor(private user:UserServiceService) { }


  ngOnInit() {
    this.user_name = this.user.getUserData("user_name");
    this.user_balance = this.user.getUserData("user_balance");
    this.user_last_win = this.user.getUserData("user_last_win");
    this.user_total_win = this.user.getUserData("user_total_win");
    this.user_total_bet = this.user.getUserData("user_total_bet");
    this.session_date = new Date().toString();
  }


}
