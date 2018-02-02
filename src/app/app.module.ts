import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CommComponent } from './comm/comm.component';
import { ViewComponent } from './view/view.component';

import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    CommComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [ SocketService ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
