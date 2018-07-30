import { Component, Input } from '@angular/core';
import { Message } from '../../services/message.service';

@Component({
    selector: 'messagelet-app',
    templateUrl: './messagelet.template.html'
})
export class MessageletComponent  {

    @Input() message: Message;

}