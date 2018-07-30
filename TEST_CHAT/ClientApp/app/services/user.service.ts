import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export class User {

    constructor(json: any) {
        this.Id = json.id ? json.id:0;
        this.Name = json.name;
        this.Email = json.email;
        this.Password = json.password;
        this.WasActive = json.wasActive;
    }
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    WasActive: any;
}

@Injectable()
export class UserService implements OnDestroy {

    private url = "/api/User";
    private _currentUsers: BehaviorSubject<User[]>;
    public currentUsers: Observable<User[]>;
    private _currentUser: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    ngOnDestroy(): void {
        clearInterval(this.updateIntervalId);
    }

    private updateIntervalId: number;
    private updateInterval: number;
    private auth: boolean;


    constructor(private http: HttpClient, private as: AuthenticationService) {
        this.updateInterval = 5000;
        this._currentUsers = new BehaviorSubject<User[]>(new Array<User>());
        this.currentUsers = this._currentUsers.asObservable();
        this._currentUser = new BehaviorSubject<User>(new User({}));
        this.currentUser = this._currentUser.asObservable();
        this.updateIntervalId = window.setInterval(() => this.getUsers(), this.updateInterval);
        as.authenticated.subscribe(a=>this.auth = a)

    }

    getUsers() {
        if (this.auth) {
            this.http.get(this.url).subscribe(data => { this._currentUsers.next((data as Array<object>).map(u => new User(u))) });   
        }
        
    }

    getUser() {
        this.http.get(this.url + '/Current').subscribe(data => { this._currentUser.next(new User(data))}); ;
    }

    saveUser(user: User) {
        return this.http.post(this.url, user);
    }
}