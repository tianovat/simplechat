import { Component, Input } from '@angular/core';
import { User } from '../../services/user.service';

@Component({
    selector: 'userlist-app',
    templateUrl: './userlist.template.html'
})
export class UserListComponent  {

    @Input() users: User[];

}