import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserListGuard implements CanDeactivate<unknown> {

  constructor(private userService: UserService) {
  }

  canDeactivate() {
    return this.userService.hasAnyUsers();
  }

}
