import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PhoneValidationService {
  validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumberRegex = /^(\+989|09)\d{9}$/; // Adjust the regex based on your requirements
      const isValid = control.value!= '' ? phoneNumberRegex.test(control.value) : true;

      return isValid ? null : { invalidPhoneNumber: true };
    };
  }
}
