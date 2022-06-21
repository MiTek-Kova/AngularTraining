import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Months, User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noAdminValidator } from '../../validators/no-admin.validator';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: number;
  userDetailsFormGroup: FormGroup;

  isSubmitted: boolean;

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedRouter.snapshot.paramMap;
    this.userId = Number(routeParams.get('userId'));
    this.isSubmitted = false;

    // We only have one layer deep, so a shallow copy here is ok
    const user = Object.assign({}, this.userService.getUser(this.userId));
    if (!user) return;

    this.userDetailsFormGroup = this.formBuilder.group({
      username: [
        user.username,
        [Validators.required, Validators.minLength(2), noAdminValidator()],
      ],
      lastname: [user.lastname, Validators.required],
      status: [user.status],
      address: this.formBuilder.group({
        firstLine: [user.address.firstLine],
        secondLine: [user.address.secondLine],
        postOrZipCode: [user.address.postOrZipCode],
      }),
      birthMonth: [user.birthMonth],
    });
  }

  goBackToUserList(): void {
    this.router.navigate(['/user-list']);
  }

  toggleStatus(): void {
    const control = this.userDetailsFormGroup?.controls['status'];
    if (!control) return;

    const newValue = control.value === 'active' ? 'inactive' : 'active';
    control.setValue(newValue);
  }

  public possibleMonths(): Array<string> {
    const keys = Object.keys(Months);
    return keys.slice(keys.length / 2);
  }

  onSubmit(): void {
    if (!this.userDetailsFormGroup) return;
    const userDetailsToSave: User = {
      id: this.userId,
      username: this.userDetailsFormGroup.controls['username']?.value,
      lastname: this.userDetailsFormGroup.controls['lastname']?.value,
      status: this.userDetailsFormGroup.controls['status']?.value,
      address: {
        firstLine: this.userDetailsFormGroup.get('address.firstLine')?.value,
        secondLine: this.userDetailsFormGroup.get('address.secondLine')?.value,
        postOrZipCode: this.userDetailsFormGroup.get('address.postOrZipCode')
          ?.value,
      },
      birthMonth: this.userDetailsFormGroup.controls['birthMonth']?.value,
    };

    if (!this.userService.updateUser(userDetailsToSave)) return;

    this.isSubmitted = true;
    setTimeout(() => {
      this.isSubmitted = false;
    }, 1500); // Get rid of submitted after a few seconds
  }
}
