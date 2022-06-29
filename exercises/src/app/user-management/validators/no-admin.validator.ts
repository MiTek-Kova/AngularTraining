import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function noAdminValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      const isAdmin = control.value.toUpperCase() === "ADMIN";
      return isAdmin ? {noAdmin: {value: control.value}} : null;
   }
}