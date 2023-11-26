import { Component } from '@angular/core';
import { Customer } from './models/customer.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  constructor() {

  }
}
