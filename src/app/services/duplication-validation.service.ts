import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class DuplicationValidationService {
  validateDuplicattion(isEdit: boolean, customer?:Customer): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {        
     
        
      if(!isEdit) {
            const isValid = !!control.value ? !this.isDuplication(control.parent as FormGroup): true;
            return isValid ? null : { duplication: true };
        } else {
          const parent = control.parent as FormGroup;
          
          
          if(
            !!customer 
            && (
              customer.DateOfBirth != parent?.controls.DateOfBirth.value
              || customer.Firstname != parent?.controls.Firstname.value
              || customer.Lastname != parent?.controls.Lastname.value
            )
          ) {
            const isValid = !!control.value ? !this.isDuplication(control.parent as FormGroup): true;
            return isValid ? null : { duplication: true };
          } 
          
          return null;
        }
    };
  }
  isDuplication(parent: FormGroup): boolean {
    const controls = parent.controls as Record<
        keyof Customer,
        FormControl
    >;
    const customerListJson = localStorage.getItem('customerList');
    let customerList: Array<Customer> = []; 
    if (customerListJson) {
        customerList = JSON.parse(customerListJson);
        const find = customerList.find((el:Customer) => {
            const firstNameFlag = el.Firstname == parent.controls.Firstname.value;
            const lastNameFlag = el.Lastname == parent.controls.Lastname.value;
            const dateOfBirthFlag = el.DateOfBirth == parent.controls.DateOfBirth.value;
            if (
                firstNameFlag
                && lastNameFlag 
                && dateOfBirthFlag
            ) {
                return true;
            }
            return false;
        });
        return find ? true : false;
    }
    
    return false;
  }
}
