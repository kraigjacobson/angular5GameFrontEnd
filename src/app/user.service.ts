import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "./user";
import {Observable} from "rxjs/Observable";
import {CookieService} from "ngx-cookie-service";
import "rxjs/add/operator/do";

@Injectable()
export class UserService {
  token;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
  }

  private url = `http://${window.location.hostname}:3000`;

  login (user: User): Observable<User> {
    return this.http.post<User>(this.url+'/login', user).do((res:any) => {
      if (res.success) {
        this.token = res.data;
        this.cookieService.set('token', this.token);
      }
    });
  }

  register (user: User): Observable<User> {
    return this.http.post<User>(this.url+'/register', {user: user});
  }

  checkSession = () => {
    if (this.token) {
      return true;
    }
  };

  getSession (): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.token })
    };
    return this.http.get<any>(this.url+'/session', httpOptions);
  }
}
