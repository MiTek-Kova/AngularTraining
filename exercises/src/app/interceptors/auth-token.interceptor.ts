import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.cookieService.get(AuthenticationService.ACCESS_TOKEN_COOKIE);
    if (accessToken !== undefined && accessToken !== null && accessToken !== "") {
      request = request.clone({
        setHeaders: {Authorization: "Bearer " + accessToken}
      });
    }
    
    return next.handle(request);
  }
}
