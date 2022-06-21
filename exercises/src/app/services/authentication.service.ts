import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _isLoggedInSubject = new BehaviorSubject<boolean>(false);
  readonly isLoggedIn$ = this._isLoggedInSubject.asObservable();

  constructor() {}

  isLoggedIn(): boolean {
    return this._isLoggedInSubject.value;
  }

  login() {
    this._isLoggedInSubject.next(true);
  }

  logOut() {
    this._isLoggedInSubject.next(false);
  }
}
