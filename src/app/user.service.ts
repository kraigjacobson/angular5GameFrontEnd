import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie-service';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import {of} from 'rxjs/observable/of';

@Injectable()
export class UserService {
    token;

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.token = this.cookieService.get('token');
    }

    private host = window.location.hostname;
    // private url = `http://${this.host}:3001`; // for local development
    private url = `https://${this.host}/blackjackserver`;
    public login (user: User): Observable<any> {
        return this.http.post<any>(this.url + '/login', user).pipe(
            tap(res => {
                this.token = res.data;
                this.cookieService.set('token', this.token);
            }),
            catchError(this.handleError<any>('login'))
        );
    }

    public register(user: User): Observable<any> {
        return this.http.post<any>(this.url + '/register', {user: user}).pipe(
            catchError(this.handleError<any>('register'))
        );
    }

    public checkSession = () => {
        if (this.token) {
            return true;
        }
    }

    public getSession(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': this.token})
        };
        return this.http.get<any>(this.url + '/session', httpOptions);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(error as T);
        };
    }
}
