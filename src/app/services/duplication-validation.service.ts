import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DuplicationValidationService {
  validateDuplicattion(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const accountNumberRegxp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Adjust the regex based on your requirements
      const isValid = control.value != "" ? accountNumberRegxp.test(control.value): true;

      return isValid ? null : { duplication: true };
    };
  }
}
