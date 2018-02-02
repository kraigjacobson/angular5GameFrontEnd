import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-comm',
  templateUrl: './comm.component.html',
  styleUrls: ['./comm.component.scss']
})
export class CommComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  constructor(private socketService: SocketService) { }

  sendMessage(message: string) {
    this.message = message;
    this.socketService.sendMessage(message);
  }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
