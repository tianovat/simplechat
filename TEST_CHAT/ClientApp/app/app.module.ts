import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UserMenuComponent } from './usermenu/usermenu.component';
import { UserListComponent } from './home/userlist/userlist.component';
import { MessageletComponent } from './home/messagelet/messagelet.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/authInterceptor';
import { AuthenticationService } from './services/authentication.service'
import { MessageService } from './services/message.service'
import { UserService, User } from './services/user.service'
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthenticationService,
        UserService,
        MessageService
    ],
    declarations: [AppComponent, HomeComponent, LoginComponent, ProfileComponent, UserMenuComponent, UserListComponent, MessageletComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }