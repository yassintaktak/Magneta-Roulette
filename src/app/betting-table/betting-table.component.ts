import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../roulette.service';
import { MessageService } from '../message.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-betting-table',
  templateUrl: './betting-table.component.html',
  styleUrls: ['./betting-table.component.css']
})
export class BettingTableComponent implements OnInit {
  public column_1:number[] = [3,6,9,12,15,18,21,24,27,30,33,36];
  public column_2:number[] = [2,5,8,11,14,17,20,23,26,29,32,35];
  public column_3:number[] = [1,4,7,10,13,16,19,22,25,28,31,34];
  public hot_numbers:number[] = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  public cold_numbers:number[] = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

  constructor(private rouletteServ:RouletteService, public messageService: MessageService, private user:UserServiceService) {}

  ngOnInit() {}

  checkInArray = function(number) {
    let found:boolean = false;
    for(var i=0; i<this.hot_numbers.length; i++) {
      if(this.hot_numbers[i] == number) {
        found = true;
        break;
      }
    }
    return found;
  }

  placeSStake = function(event, stake) {
    let tmpStk:string = stake;
    let splitSt:string;
    if(event.target.id == "split_2_bet") {
      stake = "s2|"+(stake-3).toString()+"|"+(stake).toString();
      splitSt = "current_split_stake_";
    }
    if(event.target.id == "split_4_bet") {
      stake = "s4|"+(stake).toString()+"|"+(stake+3).toString()+"|"+((stake-1)).toString()+"|"+((stake-1)+3).toString();
      splitSt = "current_split_4_stake_";
    }
    if(event.target.id == "split_6_bet") {
      stake = "s6|"+(stake).toString()+"|"+(stake+1).toString()+"|"+((stake+2)).toString()+"|"+((stake+3)).toString()+"|"+((stake+4)).toString()+"|"+((stake+5)).toString();
      splitSt = "current_split_6_stake_";
    }
    console.log(stake);
    if(!this.rouletteServ.getBettingState())
      return ;

    if(parseFloat(this.rouletteServ.getTotalStake()+this.rouletteServ.getStake()) > parseFloat(this.user.getUserData("user_balance"))) {
      this.messageService.add('No more funds.');
      return ;
    }

    switch(event.buttons) {
      case 1:
        if(this.rouletteServ.getStake() == 0) {
          this.messageService.add("Please chose a stake.");
          return ;
        }
        let betStake = this.rouletteServ.getStake();
        let newS = this.rouletteServ.addBet({number:stake, stake:betStake});
        let className:string;
        if(newS < 1) {
          className = "f_s";
        } else if(newS >= 1 && newS < 5) {
          className = "s_s";
        } else if(newS >= 5 && newS < 10) {
          className = "t_s";
        } else if(newS >= 10 && newS < 25) {
          className = "fo_s";
        } else if(newS >= 25 && newS < 50) {
          className = "fi_s";
        } else {
          className = "si_s";
        }

        let currentStake = this.rouletteServ.getStake();
        document.getElementById(splitSt+tmpStk).setAttribute("style", "");
        document.getElementById(splitSt+tmpStk).getElementsByClassName("inner")[0].innerHTML = newS;
        document.getElementById(splitSt+tmpStk).className = "stake_mini "+className;
        break;

      case 2:
        let result = this.rouletteServ.removeStake(stake);
        if(result < 1) {
          className = "f_s";
        } else if(result >= 1 && result < 5) {
          className = "s_s";
        } else if(result >= 5 && result < 10) {
          className = "t_s";
        } else if(result >= 10 && result < 25) {
          className = "fo_s";
        } else if(result >= 25 && result < 50) {
          className = "fi_s";
        } else {
          className = "si_s";
        }
        if(result <= 0)
          document.getElementById(splitSt+tmpStk).setAttribute("style", "display:none;");
        else
          document.getElementById(splitSt+tmpStk).setAttribute("style", "");

        document.getElementById(splitSt+tmpStk).getElementsByClassName("inner")[0].innerHTML = result;
        document.getElementById(splitSt+tmpStk).className = "stake_mini "+className;
        break;
    }

  }

  placeStake = function(event, stake) {
    if(event.target.id == "split_2_bet" || event.target.id == "split_4_bet" || event.target.id == "split_6_bet") {
      return ;
    }
    if(!this.rouletteServ.getBettingState())
      return ;

    if(parseFloat(this.rouletteServ.getTotalStake()+this.rouletteServ.getStake()) > parseFloat(this.user.getUserData("user_balance"))) {
      this.messageService.add('No more funds.');
      return ;
    }

    switch(event.buttons) {
      case 1:
        if(this.rouletteServ.getStake() == 0) {
          this.messageService.add("Please chose a stake.");
          return ;
        }
        let betStake = this.rouletteServ.getStake();
        let newS = this.rouletteServ.addBet({number:stake, stake:betStake});
        let className:string;
        if(newS < 1) {
          className = "f_s";
        } else if(newS >= 1 && newS < 5) {
          className = "s_s";
        } else if(newS >= 5 && newS < 10) {
          className = "t_s";
        } else if(newS >= 10 && newS < 25) {
          className = "fo_s";
        } else if(newS >= 25 && newS < 50) {
          className = "fi_s";
        } else {
          className = "si_s";
        }

        let currentStake = this.rouletteServ.getStake();
        document.getElementById("current_stake_"+stake).setAttribute("style", "");
        document.getElementById("current_stake_"+stake).getElementsByClassName("inner")[0].innerHTML = newS;
        document.getElementById("current_stake_"+stake).className = "stake_mini "+className;
        break;

      case 2:
        let result = this.rouletteServ.removeStake(stake);
        if(result < 1) {
          className = "f_s";
        } else if(result >= 1 && result < 5) {
          className = "s_s";
        } else if(result >= 5 && result < 10) {
          className = "t_s";
        } else if(result >= 10 && result < 25) {
          className = "fo_s";
        } else if(result >= 25 && result < 50) {
          className = "fi_s";
        } else {
          className = "si_s";
        }
        if(result <= 0)
          document.getElementById("current_stake_"+stake).setAttribute("style", "display:none;");
        else
          document.getElementById("current_stake_"+stake).setAttribute("style", "");

        document.getElementById("current_stake_"+stake).getElementsByClassName("inner")[0].innerHTML = result;
        document.getElementById("current_stake_"+stake).className = "stake_mini "+className;
        break;
    }

  }
  selectStakes = function(stake) {
    if(!this.rouletteServ.getBettingState())
      return ;
    switch(stake) {
      case "C1":
        for(var i=0; i<this.column_1.length; i++) {
          let element = document.getElementById("bet_"+this.column_1[i]).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "C2":
        for(var i=0; i<this.column_2.length; i++) {
          let element = document.getElementById("bet_"+this.column_2[i]).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "C3":
        for(var i=0; i<this.column_3.length; i++) {
          let element = document.getElementById("bet_"+this.column_3[i]).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "FD":
        for(var i=1; i<=12; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "SD":
        for(var i=13; i<=24; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "TD":
        for(var i=25; i<=36; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "18f":
        for(var i=1; i<=18; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "19f":
        for(var i=19; i<=36; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "E":
        for(var i=1; i<=36; i++) {
          if(i%2 == 0) {
            let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
            element.className += " active";
          }
        }
        break;
      case "O":
        for(var i=1; i<=36; i++) {
          if(i%2 != 0) {
            let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
            element.className += " active";
          }
        }
        break;
      case "R":
        for(var i=0; i<this.hot_numbers.length; i++) {
          let element = document.getElementById("bet_"+this.hot_numbers[i]).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
      case "B":
        for(var i=0; i<this.cold_numbers.length; i++) {
          let element = document.getElementById("bet_"+this.cold_numbers[i]).getElementsByClassName("number")[0];
          element.className += " active";
        }
        break;
    }
  }

  deselect = function(stake) {
    if(!this.rouletteServ.getBettingState())
      return ;
    switch(stake) {
      case "C1":
        for(var i=0; i<this.column_1.length; i++) {
          let element = document.getElementById("bet_"+this.column_1[i]).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "C2":
        for(var i=0; i<this.column_2.length; i++) {
          let element = document.getElementById("bet_"+this.column_2[i]).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "C3":
        for(var i=0; i<this.column_3.length; i++) {
          let element = document.getElementById("bet_"+this.column_3[i]).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "FD":
        for(var i=1; i<=12; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "SD":
        for(var i=13; i<=24; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "TD":
        for(var i=25; i<=36; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "18f":
        for(var i=1; i<=18; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "19f":
        for(var i=19; i<=36; i++) {
          let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "E":
        for(var i=1; i<=36; i++) {
          if(i%2 == 0) {
            let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
            element.className = element.className.replace(" active", "");
          }
        }
        break;
      case "O":
        for(var i=1; i<=36; i++) {
          if(i%2 != 0) {
            let element = document.getElementById("bet_"+i).getElementsByClassName("number")[0];
            element.className = element.className.replace(" active", "");
          }
        }
        break;
      case "R":
        for(var i=0; i<this.hot_numbers.length; i++) {
          let element = document.getElementById("bet_"+this.hot_numbers[i]).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
      case "B":
        for(var i=0; i<this.cold_numbers.length; i++) {
          let element = document.getElementById("bet_"+this.cold_numbers[i]).getElementsByClassName("number")[0];
          element.className = element.className.replace(" active", "");
        }
        break;
    }
  }
}
