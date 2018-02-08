import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertCenterModule, AlertCenterService} from 'ng2-alert-center';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {CommComponent} from './comm/comm.component';
import {ViewComponent} from './view/view.component';
import {LoginComponent} from './login/login.component';

import {SocketService} from './socket.service';
import {UserService} from "./user.service";
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        AppComponent,
        CommComponent,
        ViewComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule.forRoot(),
        AlertCenterModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [SocketService, AlertCenterService, UserService, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
