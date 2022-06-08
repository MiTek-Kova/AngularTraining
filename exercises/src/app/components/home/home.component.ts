import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string = "Brad";
  signedIn: boolean = this.authService.isLoggedIn();

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

  }

  goToUsers() {
    this.router.navigate(['/user-list'])
  }
}
