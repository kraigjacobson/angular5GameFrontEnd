import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    connection;
    buttonConnection;
    dealer;
    players = [];
    buttons = {
        'ready':false,
        'hit':false,
        'stay':false,
        'double':false,
        'split':false
    };

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.connection = this.socketService.getDataUpdate().subscribe(data => {
            console.log(data);
            this.dealer = null;
            this.players = [];
            for (let i = 0; i < data.players.length; i++) {
                if (data.players[i]) {
                    this.players.push(data.players[i]);
                }
            }
            this.dealer = data.dealer;
        });

        this.buttonConnection = this.socketService.getButtonUpdate().subscribe(data => {
            console.log('buttonupdate', data);
            for (let i = 0; i < data.length; i++) {
                this.buttons[data[i].button] = data[i].condition;
            }
        });
    }

    onClickReady() {
        this.socketService.sendAction('readyCheck');
    }

    onClickHit() {
        this.socketService.sendAction('hit');
    }

    onClickStay() {
        this.socketService.sendAction('stay');
    }

    onClickDouble() {
        this.socketService.sendAction('double');
    }

    onClickSplit() {
        this.socketService.sendAction('split');
    }
}
