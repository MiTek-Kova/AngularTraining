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
import { UserService } from "./services/user.service";
import { HomeComponent } from "./components/home/home.component";
import { LanguagePipe } from './pipes/language.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { SignInComponent } from './components/sign-in/sign-in.component';
import {AuthTokenInterceptor} from "./interceptors/auth-token.interceptor";
import { RegisterComponent } from './components/register/register.component';

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
    LanguagePipe,
    SignInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
     UserService,
     CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
