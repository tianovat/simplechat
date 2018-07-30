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
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
var Message = /** @class */ (function () {
    function Message(json) {
        this.id = json.id;
        this.author = json.author;
        this.text = json.text;
        this.time = json.time;
    }
    Object.defineProperty(Message.prototype, "timestring", {
        get: function () {
            var now = new Date(this.time * 1000);
            return now.toLocaleString();
        },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
export { Message };
var MessageService = /** @class */ (function () {
    function MessageService(http, as) {
        var _this = this;
        this.http = http;
        this.as = as;
        this.url = "/api/Message";
        this.lastMessageId = 0;
        this.updateInterval = 5000;
        this.maxMessageCount = 10;
        this._messages = new BehaviorSubject(new Array());
        this.messages = this._messages.asObservable();
        this.updateIntervalId = window.setInterval(function () { return _this.getMessages(); }, this.updateInterval);
        this.as.authenticated.subscribe(function (a) { return _this.auth = a; });
    }
    MessageService.prototype.ngOnDestroy = function () {
        clearInterval(this.updateIntervalId);
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        if (this.auth) {
            this.http.get(this.lastMessageId == 0 ? this.url : this.url + '/FromId/' + this.lastMessageId).subscribe(function (data) {
                var mId = _this.lastMessageId;
                var dt = data.map(function (m) {
                    var ret = new Message(m);
                    mId = ret.id > mId ? ret.id : mId;
                    return ret;
                }).concat(_this._messages.getValue());
                if (dt.length > _this.maxMessageCount) {
                    dt.splice(_this.maxMessageCount);
                }
                if (_this.lastMessageId < mId) {
                    _this.lastMessageId = mId;
                }
                _this._messages.next(dt);
            });
        }
    };
    MessageService.prototype.createMessage = function (text) {
        return this.http.post(this.url, { Text: text });
    };
    MessageService.prototype.deleteMessage = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    MessageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, AuthenticationService])
    ], MessageService);
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=message.service.js.map