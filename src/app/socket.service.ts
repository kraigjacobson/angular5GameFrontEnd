import {Injectable} from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io.js';
import { Observable } from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie-service';


@Injectable()

export class SocketService {
    private host = window.location.hostname;
    private url = `https://${this.host}:3001`;
    public socket;
    public token;

    constructor(private cookieService: CookieService) {

    }

    connect() {
        if (!this.socket) {
            const query = 'token=' + this.cookieService.get('token');
            this.socket = io(this.url, {
                query: query,
                reconnection: false
            });
        }
    }

    onConnect() {
        const observable = new Observable(observer => {
            this.socket.on('connect', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    onDisconnect() {
        const observable = new Observable(observer => {
            this.socket.on('disconnect', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    sendMessage(message) {
        console.log(message);
        this.socket.emit('message', message);
    }

    disconnect() {
        console.log('disconnect');
        this.socket.disconnect();
    }

    sendAction(action, data = null) {
        this.socket.emit(action, data);
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
