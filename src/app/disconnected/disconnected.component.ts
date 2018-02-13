import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-disconnected',
  templateUrl: './disconnected.component.html',
  styleUrls: ['./disconnected.component.scss']
})
export class DisconnectedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onReconnect() {
    window.location.reload();
  }

}
