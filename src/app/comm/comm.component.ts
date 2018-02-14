import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';
import {UserService} from "../user.service";

@Component({
  selector: 'app-comm',
  templateUrl: './comm.component.html',
  styleUrls: ['./comm.component.scss']
})
export class CommComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  constructor(private socketService: SocketService, private userService: UserService) { }

  sendMessage(message: string) {
    this.message = message;
    this.socketService.sendMessage(message);
  }

  ngOnInit() {

    this.socketService.onConnect().subscribe((data: any) => {


    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
