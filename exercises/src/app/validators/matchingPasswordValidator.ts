import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function matchingPasswordValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const passwordsAreTheSame = control.get("password")?.value === control.get("passwordConfirmation")?.value;
      return passwordsAreTheSame ? null : {passwordsDontMatch: {value: ""}};
   }
}