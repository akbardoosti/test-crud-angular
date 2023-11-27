import {Customer} from "./customer.interface";

export class ValidatedCustomer implements Customer {
  private _firstname: string;
  private _lastname: string;
  private _dateOfBirth: string;
  private _phoneNumber: string;
  private _email: string;
  private _bankAccountNumber: string;

  constructor(customer: Customer) {
    this.validateFirstname(customer.Firstname);
    this.validateLastname(customer.Lastname);
    this.validateDateOfBirth(customer.DateOfBirth);
    this.validatePhoneNumber(customer.PhoneNumber);
    this.validateEmail(customer.Email);
    this.validateBankAccountNumber(customer.BankAccountNumber);

    this._firstname = customer.Firstname;
    this._lastname = customer.Lastname;
    this._dateOfBirth = customer.DateOfBirth;
    this._phoneNumber = customer.PhoneNumber;
    this._email = customer.Email;
    this._bankAccountNumber = customer.BankAccountNumber;
  }

  private validateFirstname(firstname: string): void {
    // Validation logic for firstname
    if (!firstname || firstname.trim() === '') {
      throw new Error('Firstname is required');
    }
    // Add more validation logic as needed
  }

  private validateLastname(lastname: string): void {
    // Validation logic for lastname
    if (!lastname || lastname.trim() === '') {
      throw new Error('Lastname is required');
    }
    // Add more validation logic as needed
  }

  private validateDateOfBirth(dateOfBirth: string): void {
    // Validation logic for date of birth
    // Add more validation logic as needed
    const birthDatePattern = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (!birthDatePattern.test(dateOfBirth)) {
      throw new Error('Birthdate is not valid for example: 2000-05-05 is valid');
    }
  }

  private validatePhoneNumber(phoneNumber: string): void {
    // Validation logic for phone number
    // Add more validation logic as needed
    const phonePattern = /^(\+989|09)\d{9}$/;
    if (!phonePattern.test(phoneNumber)) {
      throw new Error('Phone number start with 09 or +989 for example: 09121234567');
    }
  }

  private validateEmail(email: string): void {
    // Validation logic for email
    // Add more validation logic as needed
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(email)) {
      throw new Error('Email is not valid');
    }
  }

  private validateBankAccountNumber(bankAccountNumber: string): void {
    // Validation logic for bank account number
    // Add more validation logic as needed
    const accountNumberPattern = /^[0-9]{9,18}$/;
    if (!accountNumberPattern.test(bankAccountNumber)) {
      throw new Error('Account number is not valid');
    }
  }

  // Getters for accessing the validated properties
  get Firstname(): string {
    return this._firstname;
  }

  get Lastname(): string {
    return this._lastname;
  }

  get DateOfBirth(): string {
    return this._dateOfBirth;
  }

  get PhoneNumber(): string {
    return this._phoneNumber;
  }

  get Email(): string {
    return this._email;
  }

  get BankAccountNumber(): string {
    return this._bankAccountNumber;
  }
}
