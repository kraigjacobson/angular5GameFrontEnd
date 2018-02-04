import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  connection;
  data;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getDataUpdate().subscribe(data => {
      this.data = data;
    });
  }
  onClickReady() {
    this.socketService.sendReady();
  }
}
