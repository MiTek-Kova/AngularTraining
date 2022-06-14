import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() languageChanged: EventEmitter<string> = new EventEmitter<string>();
  
  language:string = "en";

  signedIn: boolean = this.authService.isLoggedIn();
  register = "Register"

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  changeLanguage(lang:string)
  {
    this.language = lang;
    this.languageChanged.emit(lang);
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
