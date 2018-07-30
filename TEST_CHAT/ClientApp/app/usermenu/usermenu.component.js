var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
var UserMenuComponent = /** @class */ (function () {
    function UserMenuComponent(as, us, router) {
        this.as = as;
        this.us = us;
        this.router = router;
    }
    UserMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new User({});
        this.as.authenticated.subscribe(function (a) {
            _this.authenticated = a;
        });
        this.us.currentUser.subscribe(function (u) {
            _this.user = u;
        });
    };
    UserMenuComponent.prototype.logout = function () {
        this.as.logout();
    };
    UserMenuComponent = __decorate([
        Component({
            selector: 'usermenu-app',
            templateUrl: './usermenu.template.html'
        }),
        __metadata("design:paramtypes", [AuthenticationService, UserService, Router])
    ], UserMenuComponent);
    return UserMenuComponent;
}());
export { UserMenuComponent };
//# sourceMappingURL=usermenu.component.js.map