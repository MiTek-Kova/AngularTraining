import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() language:string = "en";

  welcome = "Welcome to Kova";
  
  signedIn: boolean = this.authService.isLoggedIn();

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

  }

  goToUsers() {
    this.router.navigate(['/user-list'])
  }
}
