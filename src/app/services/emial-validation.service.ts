import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
  validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegxp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Adjust the regex based on your requirements
      const isValid = control.value!= '' ? emailRegxp.test(control.value): true;
      
      return isValid ? null : { invalidEmail: true };
    };
  }
}
