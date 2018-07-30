import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';
import { AuthenticationService } from './authentication.service';

export class Message {

    constructor(json: any) {
        this.id = json.id;
        this.author = json.author;
        this.text = json.text;
        this.time = json.time;
    }

    id: number;
    author: string;
    text: string;
    time: number;
    get timestring(): string {
        let now: Date = new Date(this.time * 1000);
        return now.toLocaleString();
    }
}

@Injectable()
export class MessageService implements OnDestroy {


    ngOnDestroy(): void {
        clearInterval(this.updateIntervalId);
    }

    private updateIntervalId: number;
    private updateInterval: number;
    private _messages: BehaviorSubject<Message[]>;
    private maxMessageCount: number;
    private lastMessageId: number;
    private url: string;
    private auth: boolean;
    public messages: Observable<Message[]>;

    constructor(private http: HttpClient, private as: AuthenticationService) {
        this.url = "/api/Message";
        this.lastMessageId = 0;
        this.updateInterval = 5000;
        this.maxMessageCount = 10;
        this._messages = new BehaviorSubject<Message[]>(new Array<Message>());
        this.messages = this._messages.asObservable();
        this.updateIntervalId = window.setInterval(() => this.getMessages(), this.updateInterval);
        this.as.authenticated.subscribe(a => this.auth = a);
    }

    getMessages() {
        if (this.auth) {
            this.http.get(this.lastMessageId == 0 ? this.url : this.url + '/FromId/' + this.lastMessageId).subscribe((data: Array<object>) => {
                let mId = this.lastMessageId;
                let dt = data.map(m => {
                    let ret = new Message(m);
                    mId = ret.id > mId ? ret.id : mId;
                    return ret;
                }).concat(this._messages.getValue());
                if (dt.length > this.maxMessageCount) {
                    dt.splice(this.maxMessageCount);
                }
                if (this.lastMessageId < mId) {
                    this.lastMessageId = mId;
                }
                this._messages.next(dt);
            });   
        }        
    }

    createMessage(text: string) {
        return this.http.post(this.url, { Text: text });
    }

    deleteMessage(id: number) {
        return this.http.delete(this.url + '/' + id);
    }


}