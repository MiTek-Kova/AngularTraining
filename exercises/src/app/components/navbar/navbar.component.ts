import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  language: string = this.languageService.currentLanguage;
  signedIn: boolean = this.authService.isLoggedIn();
  register = 'Register';

  constructor(
    private readonly authService: AuthenticationService,
    private readonly languageService: LanguageService,
    private readonly router: Router
  ) {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.signedIn = isLoggedIn)
    );
    this.languageService.language$.subscribe(
      (language) => (this.language = language)
    );
  }

  ngOnInit(): void {}

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  signIn(): void {
    if (this.signedIn) {
      this.authService.logOut();
      window.location.reload();
    } else {
      this.authService.login();
      this.goHome();
    }
  }
}
