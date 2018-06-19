import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  public column_1:number[] = [3,6,9,12,15,18,21,24,27,30,33,36];
  public column_2:number[] = [2,5,8,11,14,17,20,23,26,29,32,35];
  public column_3:number[] = [1,4,7,10,13,16,19,22,25,28,31,34];
  public hot_numbers:number[] = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  public cold_numbers:number[] = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];


  checkInArray(number:number, ar:any):boolean {
    let found:boolean = false;
    for(var i=0; i<ar.length; i++) {
      if(ar[i] == number) {
        found = true;
        break;
      }
    }
    return found;
  }

  winHandler(betlist:any, wonnumber:number):number {
    let totalWinnings:number = 0;
    for(let i=0; i<betlist.length; i++) {
      if(betlist[i].number >= 0 && betlist[i].number <= 36) {
        if(wonnumber == betlist[i].number) {
          totalWinnings += betlist[i].stake*35;
        }
      }

      if(betlist[i].number == "C1") {
        if(this.checkInArray(wonnumber, this.column_1)) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "C2") {
        if(this.checkInArray(wonnumber, this.column_2)) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "C3") {
        if(this.checkInArray(wonnumber, this.column_3)) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "C1") {
        if(this.checkInArray(wonnumber, this.column_1)) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "R") {
        if(this.checkInArray(wonnumber, this.hot_numbers)) {
          totalWinnings += betlist[i].stake*2;
        }
      }

      if(betlist[i].number == "B") {
        if(this.checkInArray(wonnumber, this.cold_numbers)) {
          totalWinnings += betlist[i].stake*2;
        }
      }

      if(betlist[i].number == "O") {
        if(wonnumber%2 == 0) {
          totalWinnings += betlist[i].stake*2;
        }
      }

      if(betlist[i].number == "E") {
        if(wonnumber%2 != 1) {
          totalWinnings += betlist[i].stake*2;
        }
      }

      if(betlist[i].number == "FD") {
        if(wonnumber >= 1 && wonnumber <= 12) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "SD") {
        if(wonnumber >= 13 && wonnumber <= 24) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "TD") {
        if(wonnumber >= 25 && wonnumber <= 36) {
          totalWinnings += betlist[i].stake*3;
        }
      }

      if(betlist[i].number == "18f") {
        if(wonnumber <= 18 && wonnumber >= 1) {
          totalWinnings += betlist[i].stake*2;
        }
      }

      if(betlist[i].number == "19f") {
        if(wonnumber >= 19 && wonnumber <= 36) {
          totalWinnings += betlist[i].stake*2;
        }
      }

    }
    return totalWinnings;
  }
}
