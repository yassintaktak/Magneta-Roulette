import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../roulette.service';
import { MessageService } from '../message.service';
declare var Roulette:any;

@Component({
  selector: 'app-betting-roulette',
  templateUrl: './betting-roulette.component.html',
  styleUrls: ['./betting-roulette.component.css']
})


export class BettingRouletteComponent implements OnInit {
  rouletteObj:any;
  myInterval:any;

  constructor(private rouletteServ: RouletteService, public messageService: MessageService) {
    this.rouletteObj = new Roulette();
    this.rouletteObj.setParam("background", "#d1ccc0");
  }

  
  rollingBet = function(that) {
      that.rouletteServ.reduceBalance();
      that.messageService.add("No more bets please.");
      that.rouletteServ.setBettingState(false);
      that.roll();
  };

  ngOnInit() {
    let that=this;
    this.rouletteObj.initRoulette("#myRoulette", {width:"300", height:"270"});
    this.myInterval = setInterval(function() {that.rollingBet(that)}, 8000);
  }

  roll():void {
    let that = this;
    clearInterval(this.myInterval);
    this.rouletteObj.startRolling((number) => {
      that.rouletteServ.setWinningNumber(number);
      setTimeout(function () {
        that.messageService.add("Place your bets please.");
        that.myInterval = setInterval(function() {that.rollingBet(that)}, 8000);
      }, 1000);

    });
  }
}
