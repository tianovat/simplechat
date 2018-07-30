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
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(as, r) {
        this.as = as;
        this.r = r;
        this.authenticated = false;
        this.backAfterAuth = '/home';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.as.authenticated.subscribe(function (a) {
            _this.authenticated = a;
            if (!a) {
                _this.r.navigate(['/login']);
            }
            else {
                _this.r.navigate([_this.backAfterAuth]);
            }
        });
        this.as.backAfterAuth.subscribe(function (ba) {
            _this.backAfterAuth = ba;
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.template.html',
            styleUrls: ['./app.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService, Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map