import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'profile-app',
    templateUrl: './profile.template.html'
})
export class ProfileComponent implements OnInit {
    user: User;
    constructor(private us: UserService, private as: AuthenticationService) {
    }

    ngOnInit() {
        this.us.currentUser.subscribe(u => {
            this.user = u;
        })
        this.us.getUser();
    }
    save() {
        this.us.saveUser(this.user).subscribe(d => { this.as.login(this.user.Email, this.user.Password) });
    }
}