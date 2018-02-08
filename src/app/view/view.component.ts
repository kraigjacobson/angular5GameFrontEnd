import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {Alert, AlertCenterService, AlertType} from "ng2-alert-center";

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    dataConnection;
    buttonConnection;
    alertConnection;
    initConnection;
    dealer;
    player;
    players = [];
    buttons = {
        'ready':false,
        'hit':false,
        'stay':false,
        'double':false,
        'split':false
    };
    alert: Object;
    username: String;
    bet = 5;
    min = 5;


    constructor(private socketService: SocketService, private service: AlertCenterService) {
    }

    ngOnInit() {
        this.dataConnection = this.socketService.getDataUpdate().subscribe((data: any) => {
            console.log('getDataUpdate',data);
            this.dealer = null;
            this.players = [];
            for (let i = 0; i < data.players.length; i++) {
                let player = data.players[i];
                if (player) {
                    if (player.username === this.player.username) {
                        // this player
                        this.player = player;
                    } else {
                        this.players.push(player);
                    }
                }
            }
            this.dealer = data.dealer;
        });

        this.buttonConnection = this.socketService.getButtonUpdate().subscribe((data: any) => {
            console.log('buttonupdate', data);
            for (let i = 0; i < data.length; i++) {
                this.buttons[data[i].button] = data[i].condition;
            }
        });

        this.alertConnection = this.socketService.getAlerts().subscribe((data: any) => {
            this.alert = data;
            console.log(data);
            console.log('alert', this.alert);
            const alert = Alert.create((<any>AlertType)[data.type], data.message, 5000, false);
            this.service.alert(alert);
        });


        this.initConnection = this.socketService.getInit().subscribe((data: any) => {
            console.log('getPlayer', data);
            this.player = data;
        });
    }

    onDecreaseBet() {
        if (this.bet > 5) {
            this.bet -= 5;
        }
    }

    onIncreaseBet() {
        if (this.bet < this.player.money) {
            this.bet += 5;
        }
    }

    onClickReady() {
        this.socketService.sendAction('readyCheck', this.bet);
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
