import { Component } from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;

  constructor (private userService: UserService) {
    if (userService.checkSession()) {
      this.loggedIn = true;
    }
  }

  authorized (allowed: boolean) {
    console.log('appcomponent');
    this.loggedIn = allowed;
  }



}
