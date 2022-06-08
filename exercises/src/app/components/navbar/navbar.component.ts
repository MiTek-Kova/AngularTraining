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

  signedIn: boolean = this.authService.isLoggedIn();

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
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
      this.router.navigate(['home']);
    }
    this.signedIn = this.authService.isLoggedIn();
    this.signedInEvent.emit(this.signedIn);
  }
}
