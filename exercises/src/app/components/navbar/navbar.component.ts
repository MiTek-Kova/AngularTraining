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
  
  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
  
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  shouldShowRegisterButton(): boolean {
    // We want to register when we are not on the registration page and are not signed in
    return !this.signedIn && !this.router.url.includes("register");
  }
  
  shouldShowSignOutButton(): boolean {
    // We want the button to show "sign out" if we are signed in, and we want it to allow us to navigate
    // to the sign in page if we are not on the sign in page.
    return this.signedIn;
  }
  
  shouldShowSignInButton(): boolean {
    // We want the button to show "sign out" if we are signed in, and we want it to allow us to navigate
    // to the sign in page if we are not on the sign in page.
    if (this.signedIn)
      return false;
    return !this.router.url.includes("sign-in");
  }

  signIn(): void {
    this.goToSignIn();
  }

  signOut(): void {
    this.authService.signOut();
    window.location.reload();
  }
}
