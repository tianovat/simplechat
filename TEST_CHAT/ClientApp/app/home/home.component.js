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
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(ms, us, router) {
        this.ms = ms;
        this.us = us;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ms.getMessages();
        this.ms.messages.subscribe(function (m) { return _this.messages = m; });
        this.us.currentUsers.subscribe(function (cu) { return _this.users = cu; });
    };
    HomeComponent.prototype.send = function () {
        var _this = this;
        this.ms.createMessage(this.message).subscribe(function () { _this.ms.getMessages(); });
    };
    HomeComponent.prototype.delete = function (m) {
        this.ms.deleteMessage(m.id);
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.template.html',
            styleUrls: ['./home.css']
        }),
        __metadata("design:paramtypes", [MessageService, UserService, Router])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map