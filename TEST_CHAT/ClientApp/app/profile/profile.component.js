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
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(us, as) {
        this.us = us;
        this.as = as;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.us.currentUser.subscribe(function (u) {
            _this.user = u;
        });
        this.us.getUser();
    };
    ProfileComponent.prototype.save = function () {
        var _this = this;
        this.us.saveUser(this.user).subscribe(function (d) { _this.as.login(_this.user.Email, _this.user.Password); });
    };
    ProfileComponent = __decorate([
        Component({
            selector: 'profile-app',
            templateUrl: './profile.template.html'
        }),
        __metadata("design:paramtypes", [UserService, AuthenticationService])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map