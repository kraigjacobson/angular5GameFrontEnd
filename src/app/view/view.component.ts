import {Component, OnInit} from '@angular/core';
import {SocketService} from '../socket.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    connection;
    // data = {'players': {'username': 'kraig', 'money': 100}, 'dealer': {}, 'table': {'one': 'kraig', 'two': null}};
    data;
    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.connection = this.socketService.getDataUpdate().subscribe(data => {
            this.data = data;
            console.log(data);
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
