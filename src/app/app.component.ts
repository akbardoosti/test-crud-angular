import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {

  title = 'crud-test-angular-latest';
  editFlag: boolean = false;
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
  editedCustomer!: Customer;
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
        [Validators.required, this.duplicationValidatorService.validateDuplicattion(this.editFlag)]
      ),
      Email: new FormControl(
        this.customer.Email,
        [
          Validators.required, 
          this.emailValidator.validatePhoneNumber(),
          this.emailValidator.vaidateDuplication(false)
        ]
      ),
      Firstname: new FormControl(
        this.customer.Firstname,
        [Validators.required, this.duplicationValidatorService.validateDuplicattion(this.editFlag)]
      ),
      Lastname: new FormControl(
        this.customer.Lastname,
        [Validators.required, this.duplicationValidatorService.validateDuplicattion(this.editFlag)]
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
  
  changeControllers(isEdit: boolean) {
    this.customerFormControllers.Firstname.setValidators([
      Validators.required,
      this.duplicationValidatorService.validateDuplicattion(isEdit, this.editedCustomer)
    ]);
    this.customerFormControllers.Lastname.setValidators([
      Validators.required,
      this.duplicationValidatorService.validateDuplicattion(isEdit, this.editedCustomer)
    ]);
    this.customerFormControllers.DateOfBirth.setValidators([
      Validators.required,
      this.duplicationValidatorService.validateDuplicattion(isEdit, this.editedCustomer)
    ]);

    this.customerFormControllers.Email.setValidators([
      Validators.required,
      this.emailValidator.validatePhoneNumber(),
      this.emailValidator.vaidateDuplication(isEdit, this.editedCustomer)
    ]);
  }

  ngOnInit(): void {
    const customerListJson = localStorage.getItem('customerList');
    if (customerListJson) {
      this.customerList = JSON.parse(customerListJson);
    }
  }
  submitForm() {
    console.log(this.editFlag);
    
    if(
      this.editFlag
      || (
        !this.duplicationValidatorService.isDuplication(this.customerForm)
        && this.emailValidator.isUnique(this.customerFormControllers.Email)
      )
    ) {

      if (!this.editFlag) {
        const customer = {...this.customer};
        this.customerList.push(customer);
      } else {
        const findIndex = this.customerList.findIndex(
          el => (el.DateOfBirth == this.editedCustomer.DateOfBirth 
          && el.Firstname == this.editedCustomer.Firstname
          && el.Lastname == this.editedCustomer.Lastname)
        );
        if (findIndex != -1) {
          this.customerList[findIndex] = {...this.customer};
        }
      }
      
      localStorage.setItem('customerList', JSON.stringify(this.customerList));
      this.customer = {
        BankAccountNumber: '',
        DateOfBirth: '',
        Email: '',
        Firstname: '',
        Lastname: '',
        PhoneNumber: ''
      };
      this.changeControllers(false);
      this.editFlag = false;
    } else {
      alert('this customer is duplicated');
    }
  }

  deleteCustomer (customer: Customer) {
    if (confirm("Are you sure?") == true) {
      this.customerList = this.customerList.filter(item => {
        const firstNameFlag = item.Firstname == customer.Firstname;
        const lastNameFlag = item.Lastname == customer.Lastname;
        const dateOfBirthFlag = item.DateOfBirth == customer.DateOfBirth;
        if (firstNameFlag && lastNameFlag && dateOfBirthFlag) {
          return false;
        } else {
          return true;
        }
      });
      localStorage.setItem('customerList', JSON.stringify(this.customerList));
    }
  }
  editCustomer(customer: Customer) {
    this.editFlag = true;
    this.customer = {...customer};
    this.editedCustomer = {...customer};
    // console.log(this.editedCustomer);
    
    this.changeControllers(true);
  }
}
