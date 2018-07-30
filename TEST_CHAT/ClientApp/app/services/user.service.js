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
import { AuthenticationService } from './authentication.service';
var User = /** @class */ (function () {
    function User(json) {
        this.Id = json.id ? json.id : 0;
        this.Name = json.name;
        this.Email = json.email;
        this.Password = json.password;
        this.WasActive = json.wasActive;
    }
    return User;
}());
export { User };
var UserService = /** @class */ (function () {
    function UserService(http, as) {
        var _this = this;
        this.http = http;
        this.as = as;
        this.url = "/api/User";
        this.updateInterval = 5000;
        this._currentUsers = new BehaviorSubject(new Array());
        this.currentUsers = this._currentUsers.asObservable();
        this._currentUser = new BehaviorSubject(new User({}));
        this.currentUser = this._currentUser.asObservable();
        this.updateIntervalId = window.setInterval(function () { return _this.getUsers(); }, this.updateInterval);
        as.authenticated.subscribe(function (a) { return _this.auth = a; });
    }
    UserService.prototype.ngOnDestroy = function () {
        clearInterval(this.updateIntervalId);
    };
    UserService.prototype.getUsers = function () {
        var _this = this;
        if (this.auth) {
            this.http.get(this.url).subscribe(function (data) { _this._currentUsers.next(data.map(function (u) { return new User(u); })); });
        }
    };
    UserService.prototype.getUser = function () {
        var _this = this;
        this.http.get(this.url + '/Current').subscribe(function (data) { _this._currentUser.next(new User(data)); });
        ;
    };
    UserService.prototype.saveUser = function (user) {
        return this.http.post(this.url, user);
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, AuthenticationService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map