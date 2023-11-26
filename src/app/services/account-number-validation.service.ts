import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AccountNumberValidation {
  validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const accountNumberRegxp = /^[0-9]{9,18}$/; // Adjust the regex based on your requirements
      const isValid = control.value != '' ? accountNumberRegxp.test(control.value) : true;

      return isValid ? null : { invalidAccountNumber: true };
    };
  }
}
