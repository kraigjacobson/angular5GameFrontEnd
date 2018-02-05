import {Injectable} from '@angular/core';
import * as io from 'socket.io-client/dist/socket.io.js';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class SocketService {
    private url = `http://${window.location.hostname}:3000`;
    private socket;


    sendMessage(message) {
        this.socket.emit('message', message);
        console.log('message sent to server');
    }

    sendAction(action) {
        this.socket.emit(action);
        console.log(`${action} sent to the server`);
    }

    getMessages() {
        let observable = new Observable(observer => {
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
        let observable = new Observable(observer => {
            this.socket.on('dataUpdate', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getButtonUpdate() {
        let observable = new Observable(observer => {
            this.socket.on('buttons', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    constructor() {
        if (!this.socket) {
            this.socket = io(this.url, {
                // query: 'token=48b1b85c225a4d46a6a5b7c61261904343130d65993f647d63ff447b4cf072982276cc67d7735002a5bd10a587187404bf7651b2fd69cd4e4436b7517c74c283' // home machine
                query: 'token=05fa250323cd9e549598d70578eb36529777085f4e41cfa87fc45a65cf5df47dab1dc55496caf9f87819ec43e638c1ae845740ff638e5f3223d6c243ab08c74c' // work machine
            });
            console.log(this.socket);
        }
    }
}
