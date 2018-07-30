import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private _authenticated: BehaviorSubject<boolean>;
    authenticated: Observable<boolean>;
    private _backAfterAuth: BehaviorSubject<string>;
    backAfterAuth: Observable<string>;

    constructor(private http: HttpClient) {
        this._authenticated = new BehaviorSubject<boolean>('currentUser' in localStorage);
        this.authenticated = this._authenticated.asObservable();
        this._backAfterAuth = new BehaviorSubject<string>('/home');
        this.backAfterAuth = this._backAfterAuth.asObservable();
    }

    login(username: string, password: string) {
        console.log('logging in');
        this.http.post<any>('/api/Login', { Email: username, Password: password })
            .pipe(map(user => {
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this._authenticated.next(true);
            })).subscribe();
    }

    logout() {
        localStorage.removeItem('currentUser');
        this._authenticated.next(false);
    }

    remeberBackPath(path: string) {
        this._backAfterAuth.next(path);
    }

}