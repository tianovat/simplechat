import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.template.html',
    styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

    messages: Message[];
    users: User[];
    message: string;

    constructor(private ms: MessageService, private us: UserService, private router: Router) { }

    ngOnInit() {
        this.ms.getMessages();
        this.ms.messages.subscribe(m => this.messages = m);
        this.us.currentUsers.subscribe(cu => this.users = cu);
    }


    send() {
        this.ms.createMessage(this.message).subscribe(() => { this.ms.getMessages(); });
    }

    delete(m: Message) {
        this.ms.deleteMessage(m.id);
    }
}