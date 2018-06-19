import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  message:string = "Idle.";

  add(message: string) {
    this.messages.push(message);
    this.message = message;
  }

  clear() {
    this.messages = [];
  }
}
