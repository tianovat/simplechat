import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'login-app',
    templateUrl: './login.template.html'
})
export class LoginComponent implements OnInit {

    constructor(private as: AuthenticationService, private us: UserService, private router: Router) { }

    ngOnInit() {
        this.as.authenticated.subscribe(a => {
            this.us.getUser();
        })
    }
    login: string;
    password: string;
    auth() {
        this.as.login(this.login, this.password);
        };
}