import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../roulette.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-betting-stakes',
  templateUrl: './betting-stakes.component.html',
  styleUrls: ['./betting-stakes.component.css']
})
export class BettingStakesComponent implements OnInit {
  counter:number = 0;
  public stakes:string[] = ["05", "1", "5", "10", "25", "50"];

  constructor(private rouletteServ: RouletteService, public messageService: MessageService) { }

  selectStakeAm = function(amount) {
    for(let i=0; i<this.stakes.length; i++)
      document.getElementById("arrow_"+this.stakes[i]).setAttribute("style", "display:none;");
    document.getElementById("arrow_"+amount).setAttribute("style", "");
    this.rouletteServ.setStake(amount);
  }

  backMessage():void {
    if(this.counter == this.messageService.messages.length-1) {
      this.counter = 0;
    }
    if(this.counter < this.messageService.messages.length) {
      this.counter += 1;
      this.messageService.message = this.messageService.messages[this.messageService.messages.length-this.counter];
    }

  }

  ngOnInit() {
    this.counter = 1;
  }

}
