import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
    selector: 'usermenu-app',
    templateUrl: './usermenu.template.html'
})
export class UserMenuComponent implements OnInit {

    public user: User;
    public authenticated: boolean;

    constructor(private as: AuthenticationService, private us: UserService, private router: Router) { }

    ngOnInit() {
        this.user = new User({});
        this.as.authenticated.subscribe(a => {
            this.authenticated = a;
        })
        this.us.currentUser.subscribe(u => {
            this.user = u;
        })
    }


    logout() {
        this.as.logout();
    }
}