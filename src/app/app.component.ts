import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {SocketService} from "./socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;
  disconnect = false;

  constructor (private userService: UserService, private socketService: SocketService) {
    if (userService.checkSession()) {
      this.loggedIn = true;
    }
  }

  authorized (state: boolean) {
    console.log('appcomponent');
    this.loggedIn = state;
  }

  disconnected (state: boolean) {
    this.disconnect = state;
  }



}
