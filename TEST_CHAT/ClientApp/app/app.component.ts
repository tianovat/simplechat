import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: './app.template.html',
    styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
    constructor(private as: AuthenticationService, private r: Router) {
    }
    authenticated = false;
    backAfterAuth = '/home';
    ngOnInit() {
        this.as.authenticated.subscribe(a => {
            this.authenticated = a;
            if (!a) {
                this.r.navigate(['/login'])
            } else {
                this.r.navigate([this.backAfterAuth])
            }
        });
        this.as.backAfterAuth.subscribe((ba:string) => {
            this.backAfterAuth = ba;
        });
    }
}