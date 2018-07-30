var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this._authenticated = new BehaviorSubject('currentUser' in localStorage);
        this.authenticated = this._authenticated.asObservable();
        this._backAfterAuth = new BehaviorSubject('/home');
        this.backAfterAuth = this._backAfterAuth.asObservable();
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        console.log('logging in');
        this.http.post('/api/Login', { Email: username, Password: password })
            .pipe(map(function (user) {
            if (user && user.access_token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            _this._authenticated.next(true);
        })).subscribe();
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this._authenticated.next(false);
    };
    AuthenticationService.prototype.remeberBackPath = function (path) {
        this._backAfterAuth.next(path);
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map