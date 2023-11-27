import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegxp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Adjust the regex based on your requirements
      const isValid =
        !!control.value ?emailRegxp.test(control.value):true;

      return isValid ? null : { invalidEmail: true };
    };
  }
  validateDuplication(isEdit: boolean, customer?:Customer): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(
          !isEdit
          || (
            isEdit
            && (!!customer
            && control.value != customer.Email)
          )
        ) {
            const isValid =
              !!control.value? this.isUnique(control as FormControl) : true;

            return isValid ? null : { duplication: true };
        }
        return null;
      };
  }
  isUnique(control: FormControl, customer?:Customer): boolean {
    const customerListJson = localStorage.getItem('customerList');
    let customerList: Array<Customer> = [];
    if (
      customerListJson
      && (
        !customer
        || (!!customer && customer.Email != control.value)
      )
    ) {
        customerList = JSON.parse(customerListJson);
        const find = customerList.find((el:Customer) => {
            const emailFlag = el.Email == control.value;
            if (
                emailFlag
            ) {
                return true;
            }
            return false;
        });
        if (find) {
          throw new Error('Email is duplicated');
        }
    }

    return true;
  }
}
