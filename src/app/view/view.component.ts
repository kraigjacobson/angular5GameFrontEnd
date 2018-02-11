import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';
import {Alert, AlertCenterService, AlertType} from 'ng2-alert-center';
import {UserService} from '../user.service';
import {CapitalizePipe} from '../pipes/capitalize.pipe';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    sessionConnection;
    dataConnection;
    buttonConnection;
    alertConnection;
    initConnection;
    dealer;
    player;
    players = [];
    buttons = {
        'ready': false,
        'hit': false,
        'stay': false,
        'double': false,
        'split': false
    };
    alert: Object;
    username: String;
    bet = 5;
    session;
    activePlay = false;


    constructor(private socketService: SocketService, private alertService: AlertCenterService, private userService: UserService) {}

    ngOnInit() {
        this.sessionConnection = this.userService.getSession().subscribe((data: any) => {
            this.session = data;
            this.socketService.connect();

            this.dataConnection = this.socketService.getDataUpdate().subscribe((data: any) => {
                console.log('getDataUpdate', data);
                this.dealer = null;
                this.players = [];
                this.activePlay = data.activePlay;
                for (let i = 0; i < data.players.length; i++) {
                    const player = data.players[i];
                    if (player) {
                        if (player.username === this.session.user.username) {
                            // this player
                            this.player = player;
                        } else {
                            this.players.push(player);
                        }
                    }
                }
                if (this.player.turn) {
                    this.buttons.hit = true;
                    this.buttons.stay = true;
                    // this.buttons.double = true;
                    // this.buttons.split = true;
                } else {
                    this.buttons.hit = false;
                    this.buttons.stay = false;
                    // this.buttons.double = false;
                    // this.buttons.split = false;
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
                this.alertService.alert(alert);
            });


            this.initConnection = this.socketService.getInit().subscribe((data: any) => {
                console.log('getPlayer', data);
                this.player = data;
            });
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
