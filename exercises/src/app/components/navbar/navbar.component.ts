import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output("signedInEvent")
  signedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  signedIn: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.signedIn = this.authService.isLoggedIn;
  }

  goHome(): void {
    this.router.navigate(['/home'])
  }

  signIn(): void {
    if (this.signedIn) {
      this.authService.logOut();
    } else {
      this.authService.login();
    }
    this.signedIn = this.authService.isLoggedIn;
    this.signedInEvent.emit(this.signedIn);
  }
}
