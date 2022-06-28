import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  failed: boolean;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  
  onSubmit(): void {
    const username = this.signInForm.controls["username"].value;
    const password = this.signInForm.controls["password"].value;
    
    this.authService.signIn(username, password, () => {
      this.router.navigate(["/home"]);
    }, () => {
      this.failed = true;
      setTimeout(() => {
        this.failed = false;
      }, 3000); // Get rid of the error after a few seconds
    });
  }
}
