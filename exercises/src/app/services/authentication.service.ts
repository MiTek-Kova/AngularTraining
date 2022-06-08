import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isLoggedIn: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  login() {
    this._isLoggedIn = true;
  }

  logOut() {
    this._isLoggedIn = false;
  }
}
