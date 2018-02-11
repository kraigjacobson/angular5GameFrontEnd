import {Injectable} from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io.js';
import { Observable } from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie-service';


@Injectable()

export class SocketService {
    private host = 'localhost';
    private url = `http://${this.host}:3000`;
    public socket;
    public token;

    constructor(private cookieService: CookieService) {

    }

    connect() {
        if (!this.socket) {
            const query = 'token=' + this.cookieService.get('token');
            this.socket = io(this.url, {
                query: query
            });
        }
    }

    sendMessage(message) {
        this.socket.emit('message', message);
        console.log('message sent to server');
    }

    sendAction(action, data = null) {
        this.socket.emit(action, data);
        console.log(`${action} sent to the server`);
    }

    getMessages() {
        const observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getDataUpdate() {
        const observable = new Observable(observer => {
            this.socket.on('dataUpdate', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getInit() {
        const observable = new Observable(observer => {
            this.socket.on('init', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getButtonUpdate() {
        const observable = new Observable(observer => {
            this.socket.on('buttons', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getAlerts() {
        const observable = new Observable(observer => {
            this.socket.on('alert', (data: String) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
}
