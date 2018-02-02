import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  connection;
  players;
  dealer;
  table;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getDataUpdate().subscribe(data => {
      this.players = data.players;
      this.dealer = data.dealer;
      this.table = data.table;
    })
  }
  onClickReady() {
    this.socketService.sendReady();
  }
}
