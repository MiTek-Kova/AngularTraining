import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {matchingPasswordValidator} from "../../validators/matchingPasswordValidator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  failed: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      lastname: [""],
      password: ["", Validators.required],
      passwordConfirmation: ["", Validators.required]
    }, {
      validator: matchingPasswordValidator()
    });
  }

  onSubmit(): void {
    const username = this.registerForm.controls["username"].value;
    const password = this.registerForm.controls["password"].value;

    this.authService.register(username, password, () => {
      this.router.navigate(["/home"]);
    }, () => {
      this.failed = true;
      setTimeout(() => {
        this.failed = false;
      }, 3000); // Get rid of the error after a few seconds
    });
  }
}

