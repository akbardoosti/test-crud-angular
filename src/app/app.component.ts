import { Component } from '@angular/core';
import { Customer } from './models/customer.interface';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PhoneValidationService } from './services/phone-validation.service';
import { EmailValidationService } from './services/emial-validation.service';
import { AccountNumberValidation } from './services/account-number-validation.service';
import { DuplicationValidationService } from './services/duplication-validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    EmailValidationService
  ]
})
export class AppComponent {
  title = 'crud-test-angular-latest';
  customerList: Array<Customer> = [];

  customer: Customer = {
    BankAccountNumber: '',
    DateOfBirth: '',
    Email: '',
    Firstname: '',
    Lastname: '',
    PhoneNumber: ''
  };
  customerFormControllers: Record<
    keyof Customer,
    FormControl
  >;
  customerForm: FormGroup;
 
  constructor(
    private formBuilder:FormBuilder,
    private phoneValidator: PhoneValidationService,
    private emailValidator: EmailValidationService,
    private accountNumberValidator: AccountNumberValidation,
    private duplicationValidatorService: DuplicationValidationService
  ) {
    this.customerFormControllers = {
      BankAccountNumber: new FormControl(
        this.customer.BankAccountNumber,
        [Validators.required, this.accountNumberValidator.validatePhoneNumber()]
      ),
      DateOfBirth: new FormControl(
        this.customer.DateOfBirth,
        [Validators.required, this.duplicationValidatorService.validateDuplicattion()]
      ),
      Email: new FormControl(
        this.customer.Email,
        [Validators.required, this.emailValidator.validatePhoneNumber()]
      ),
      Firstname: new FormControl(
        this.customer.Firstname,
        [Validators.required, this.duplicationValidatorService.validateDuplicattion()]
      ),
      Lastname: new FormControl(
        this.customer.Lastname,
        [Validators.required, this.duplicationValidatorService.validateDuplicattion()]
      ),
      PhoneNumber: new FormControl(
       
        this.customer.PhoneNumber, 
        [Validators.required, this.phoneValidator.validatePhoneNumber()]
      ),
    };

    this.customerForm = formBuilder.group(
      this.customerFormControllers
    );
  }
  
}
