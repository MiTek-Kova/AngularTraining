import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminUserlistComponent } from './components/admin-userlist/admin-userlist.component';
import { AdminUsermanagerComponent } from './components/admin-usermanager/admin-usermanager.component';
import { SelectedUserDirective } from './directives/selected-user.directive';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './components/error/error.component';
import {UserService} from "./services/user.service";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NavbarComponent,
    AdminUserlistComponent,
    AdminUsermanagerComponent,
    SelectedUserDirective,
    UserDetailsComponent,
    ErrorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
