import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from '../user';
import {UserService} from "../user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    @Output() authorized = new EventEmitter<boolean>();

    onRegister = () => {
        console.log(this.model);
        this.userService.register(this.model)
            .subscribe((res: any) => {
                if (res.success) {
                    console.log(res);
                    this.onLogin();
                }
            });
    };

    onLogin = () => {
        this.userService.login(this.model)
            .subscribe((res: any) => {
                if (res.success) {
                    console.log(res);
                    this.authorized.emit(true);
                }
            });
    };


    fears = ['Sharks', 'Spiders',
        'No Money During a Steam Sale', 'Dolls'];

    model = new User('Jibroni', 'testpass', 'Sharks');



}
