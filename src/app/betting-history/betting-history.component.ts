import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-betting-history',
  templateUrl: './betting-history.component.html',
  styleUrls: ['./betting-history.component.css']
})
export class BettingHistoryComponent implements OnInit {

  public messages:string[];
  constructor(private messageServ:MessageService) { }

  ngOnInit() {
    //console.log(this.messageServ);
    this.messages = this.messageServ.messages;
  }

}
