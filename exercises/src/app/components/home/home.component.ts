import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroyed = new Subject<void>();

  language = this.languageService.currentLanguage;
  welcome = 'Welcome to Kova';
  signedIn$ = this.authService.isLoggedIn$;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly languageService: LanguageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    /**
     * `language$` is an "external" observable. The home component can
     * be destroyed before the language stream completes, so we should use
     * `takeUntil()` to keep ourselves safe from memory leaks.
     *
     * In this case it doesn't matter _too_ much because the source of the
     * language stream is within our app and not an api call or http request,
     * but it is always safer to use the operator and not make assumptions.
     */
    this.languageService.language$
      .pipe(takeUntil(this.destroyed))
      .subscribe((language) => (this.language = language));
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  goToUsers() {
    this.router.navigate(['/user-management/user-list']);
  }
}
