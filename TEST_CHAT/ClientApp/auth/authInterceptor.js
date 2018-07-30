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
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from '../app/services/authentication.service';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.access_token
                }
            });
        }
        return next.handle(request).pipe(catchError(function (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    _this.authService.logout();
                    _this.router.navigate(['/login']);
                }
                return EMPTY;
            }
        }));
    };
    AuthInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService, Router])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
export { AuthInterceptor };
//# sourceMappingURL=authInterceptor.js.map