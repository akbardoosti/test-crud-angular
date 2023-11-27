import {Component, OnInit} from '@angular/core';
import {Customer} from './models/customer.interface';
import {ValidatedCustomer} from './models/validated-customer.class';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneValidationService} from './services/phone-validation.service';
import {EmailValidationService} from './services/emial-validation.service';
import {AccountNumberValidation} from './services/account-number-validation.service';
import {DuplicationValidationService} from './services/duplication-validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    FormBuilder,
    PhoneValidationService,
    EmailValidationService,
    AccountNumberValidation,
    DuplicationValidationService
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
  editedCustomer?: Customer;
  customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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
      Firstname: new FormControl(
        this.customer.Firstname,
        [Validators.required,
        ]
      ),
      Lastname: new FormControl(
        this.customer.Lastname,
        [Validators.required,
        ]
      ),
      DateOfBirth: new FormControl(
        this.customer.DateOfBirth,
        [Validators.required,
        ]
      ),
      Email: new FormControl(
        this.customer.Email,
        [
          Validators.required,
          this.emailValidator.validateEmail(),
        ]
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
    ]);
    this.customerFormControllers.Lastname.setValidators([
      Validators.required,
    ]);
    this.customerFormControllers.DateOfBirth.setValidators([
      Validators.required,
    ]);

    this.customerFormControllers.Email.setValidators([
      Validators.required,
      this.emailValidator.validateEmail(),
    ]);
  }

  ngOnInit(): void {
    const customerListJson = localStorage.getItem('customerList');
    if (customerListJson) {
      this.customerList = JSON.parse(customerListJson);
    }
  }

  submitForm() {
    try {
      const validatedCustomer = new ValidatedCustomer(this.customer);

      if (
        !this.duplicationValidatorService.isDuplication(this.customerForm, this.editedCustomer)
        && this.emailValidator.isUnique(this.customerFormControllers.Email, this.editedCustomer)
      ) {
        if (!this.editFlag) {
          const customer = {...this.customer};
          this.customerList.push(customer);
        } else {
          const findIndex = this.customerList.findIndex(
            el => (el.DateOfBirth == this.editedCustomer?.DateOfBirth
              && el.Firstname == this.editedCustomer?.Firstname
              && el.Lastname == this.editedCustomer?.Lastname)
          );
          if (findIndex != -1) {
            this.customerList[findIndex] = {...this.customer};
          }
        }

        localStorage.setItem('customerList', JSON.stringify(this.customerList));
        this.changeControllers(false);
        this.editFlag = false;
        this.editedCustomer = undefined;
        this.customerForm.reset();
      } else {
        alert('this customer is duplicated');
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  deleteCustomer(customer: Customer) {
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
    this.changeControllers(true);
    this.editFlag = true;
    this.editedCustomer = {...customer};
    this.customerForm.setValue(
      customer
    );
  }
}
