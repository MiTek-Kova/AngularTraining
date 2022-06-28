import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MyUserApiClient, SignInRequestDto} from "../api/myUserApi.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _isLoggedInSubject = new BehaviorSubject<boolean>(this.hasAccessTokenCookie());
  readonly isLoggedIn$ = this._isLoggedInSubject.asObservable();
  
  apiClient: MyUserApiClient;

  static readonly ID_TOKEN_COOKIE: string = "IdToken";
  static readonly ACCESS_TOKEN_COOKIE: string = "AccessToken";
  
  constructor(httpClient: HttpClient, private cookieService: CookieService) {
    this.apiClient = new MyUserApiClient(httpClient, environment.apiLocation);
  }

  isLoggedIn(): boolean {
    return this._isLoggedInSubject.value;
  }
  
  hasAccessTokenCookie(): boolean {
    const accessToken = this.cookieService.get(AuthenticationService.ACCESS_TOKEN_COOKIE);
    return accessToken !== undefined && accessToken !== null && accessToken !== "";
  }

  signIn(username: string, password: string, callback: Function, errorCallback: Function): void {
    
    const signInRequestDto: SignInRequestDto = new SignInRequestDto({
      username: username,
      password: password
    });
    
    this.apiClient.signIn(signInRequestDto).subscribe(response => {
      if (!response.idToken || !response.authToken)
        return;
      
      this.cookieService.set(AuthenticationService.ACCESS_TOKEN_COOKIE, response.authToken);
      this.cookieService.set(AuthenticationService.ID_TOKEN_COOKIE, response.idToken);
      
      this._isLoggedInSubject.next(true);
      
      callback();
    }, 
          error => {
        errorCallback();
       });
  }
  
  register(username: string, password: string, callback: Function, errorCallback: Function): void {
    
    const signInRequestDto: SignInRequestDto = new SignInRequestDto({
      username: username,
      password: password
    });
    
    this.apiClient.register(signInRequestDto).subscribe(response => {
      if (!response.idToken || !response.authToken)
        return;
      
      this.cookieService.set(AuthenticationService.ACCESS_TOKEN_COOKIE, response.authToken);
      this.cookieService.set(AuthenticationService.ID_TOKEN_COOKIE, response.idToken);
      
      this._isLoggedInSubject.next(true);
      
      callback();
    }, 
          error => {
      errorCallback();
    });
  }

  signOut() {
    this.cookieService.delete(AuthenticationService.ACCESS_TOKEN_COOKIE);
    this.cookieService.delete(AuthenticationService.ID_TOKEN_COOKIE);
    this._isLoggedInSubject.next(false);
  }
  
  // Gets the name claim if we have one. Returns blank if we have no claim
  getNameClaim(): string {
    const accessToken = this.cookieService.get(AuthenticationService.ACCESS_TOKEN_COOKIE);
    if (!accessToken)
      return "";
    
    const decodedToken: any = jwtDecode(accessToken);
    if (!decodedToken)
      return "";

    return decodedToken.name;
  }
}
