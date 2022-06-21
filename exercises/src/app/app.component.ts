import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'exercises';
  signedIn = false;
  name = 'Brad';
  greeting = 'Hello';
  language = this.langService.currentLanguage;
  register = 'Register';

  users: Pick<User, 'username' | 'status'>[] = [];

  constructor(
    private readonly authService: AuthenticationService,
    private readonly langService: LanguageService
  ) {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.signedIn = isLoggedIn)
    );
    this.langService.language$.subscribe(
      (language) => (this.language = language)
    );
  }
}
