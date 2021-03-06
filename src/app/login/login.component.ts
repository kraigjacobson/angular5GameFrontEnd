import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Alert, AlertCenterService, AlertType} from 'ng2-alert-center';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Output() authorized = new EventEmitter<boolean>();
    fears = ['Sharks', 'Spiders',
        'No Money During a Steam Sale', 'Dolls'];
    model = new User(null, null, null);
    constructor(private userService: UserService, private alertService: AlertCenterService) {
    }

    ngOnInit() {
    }

    onRegister = () => {
        console.log(this.model);
        this.userService.register(this.model)
            .subscribe(res => {
                if (res.success) {
                    this.onLogin();
                } else {
                    console.log('res', res);
                    const alert = Alert.create((<any>AlertType)['DANGER'], res.error.error.message, 5000, false);
                    this.alertService.alert(alert);
                }
            });
    }

    onLogin = () => {
        console.log('logging in');
        this.userService.login(this.model)
            .subscribe(res => {
                if (res.success) {
                    this.authorized.emit(true);
                } else {
                    console.log('res', res);
                    const alert = Alert.create((<any>AlertType)['DANGER'], res.error.error.message, 5000, false);
                    this.alertService.alert(alert);
                }
            });
    }







}
