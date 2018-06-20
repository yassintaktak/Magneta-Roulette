import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HandlerService } from './handler.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})

export class RouletteService {
  private currentStake:number = 0;
  private betList:any[] = [];
  private bettingState:boolean = true;

  constructor(private messageService: MessageService, private handlerService:HandlerService, private user:UserServiceService) {
    this.messageService.add("Place your bets please.");
  }

  getBettingState():boolean {
    return this.bettingState;
  }
  setBettingState(bs:boolean):void {
    this.bettingState = bs;
  }

  getTotalStake():number {
    let totalStake:number = 0;
    for(let i=0; i<this.betList.length; i++) {
      totalStake += this.betList[i].stake;
    }
    return totalStake;
  }

  addBet(bet:any):number {
    let totalS:boolean=false;
    if(parseFloat(this.getTotalStake()+bet.stake) > parseFloat(this.user.getUserData("user_balance"))) {
      this.messageService.add('No more funds.');
      totalS = true;
    }
    let newStake:number;
    let found:boolean = false;
    for(let i=0; i<this.betList.length; i++) {
      if(this.betList[i].number == bet.number) {
        if(!totalS)
          this.betList[i].stake += bet.stake;
        newStake = this.betList[i].stake;
        found = true;
        break;
      }
    }
    if(!found) {
      if(!totalS)
        this.betList.push(bet);
      newStake = bet.stake;
    }


    totalS && this.messageService.add('Bet Placed ['+bet.number+']');
    return newStake;
  }

  setStake(stake:string):void {
    if(stake == "05")
      stake = "0.5";
    this.currentStake = parseFloat(stake);
    this.messageService.add('Current Stake ['+this.currentStake+']');
  };

  getStake():number {
    return this.currentStake;
  };

  clearStakes():void {
    this.betList = [];
    for(let i=0; i<=36; i++) {
      document.getElementById("current_stake_"+i).setAttribute("style", "display:none;");
      if(document.getElementById("current_split_stake_"+i) != undefined)
        document.getElementById("current_split_stake_"+i).setAttribute("style", "display:none;");
      if(document.getElementById("current_split_4_stake_"+i) != undefined)
        document.getElementById("current_split_4_stake_"+i).setAttribute("style", "display:none;");
      if(document.getElementById("current_split_6_stake_"+i) != undefined)
        document.getElementById("current_split_6_stake_"+i).setAttribute("style", "display:none;");
    }
    document.getElementById("current_stake_C1").setAttribute("style", "display:none;");
    document.getElementById("current_stake_C2").setAttribute("style", "display:none;");
    document.getElementById("current_stake_C3").setAttribute("style", "display:none;");
    document.getElementById("current_stake_FD").setAttribute("style", "display:none;");
    document.getElementById("current_stake_SD").setAttribute("style", "display:none;");
    document.getElementById("current_stake_TD").setAttribute("style", "display:none;");
    document.getElementById("current_stake_18f").setAttribute("style", "display:none;");
    document.getElementById("current_stake_19f").setAttribute("style", "display:none;");
    document.getElementById("current_stake_O").setAttribute("style", "display:none;");
    document.getElementById("current_stake_E").setAttribute("style", "display:none;");
    document.getElementById("current_stake_R").setAttribute("style", "display:none;");
    document.getElementById("current_stake_B").setAttribute("style", "display:none;");
  }

  setWinningNumber(number:number):void {
    this.setBettingState(true);
    this.messageService.add('Winning Number ['+number+']');
    let nBalance:number = this.handlerService.winHandler(this.betList, number);
    if(nBalance > 0) {
      this.messageService.add('You won '+nBalance+'$');
    }
    this.user.setUserData("user_balance", (parseFloat(this.user.getUserData("user_balance"))+nBalance).toString());
    this.user.setUserData("user_last_win", nBalance.toString());
    this.user.setUserData("user_total_win", (parseFloat(this.user.getUserData("user_total_win"))+nBalance).toString());
    if(document.getElementById("user_last_win") != undefined) {
      document.getElementById("user_last_win").innerHTML = this.user.getUserData("user_last_win")+"$";
      document.getElementById("user_total_win").innerHTML = this.user.getUserData("user_total_win")+"$";
    }
    this.clearStakes();
  };

  removeStake(stake:number):number {
    let nStake:number;
    for(var i=0; i<this.betList.length; i++) {
      if(this.betList[i].number == stake) {
        this.betList[i].stake -= this.currentStake;
        nStake = this.betList[i].stake;
        if(this.betList[i].stake <= 0)
          this.betList.splice(i, 1);
      }
    }
    if(nStake == undefined) {
      nStake = 0;
    }
    return nStake;
  }

  reduceBalance():void {
    let totalBalance:number = 0;
    for(let i=0; i<this.betList.length; i++) {
      totalBalance += this.betList[i].stake;
    }
    this.user.setUserData("user_balance", (parseFloat(this.user.getUserData("user_balance"))-totalBalance).toString())
    this.user.setUserData("user_total_bet", (parseFloat(this.user.getUserData("user_total_bet"))+totalBalance).toString())
    if(document.getElementById("userBal") != undefined) {
      document.getElementById("userBal").innerHTML = this.user.getUserData("user_balance")+"$";
      document.getElementById("user_total_bet").innerHTML = this.user.getUserData("user_total_bet")+"$";
    }

  }
}
