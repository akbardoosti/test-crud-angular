import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneValidationService } from './services/phone-validation.service';
import { EmailValidationService } from './services/emial-validation.service';
import { AccountNumberValidation } from './services/account-number-validation.service';
import { DuplicationValidationService } from './services/duplication-validation.service';
import { Customer } from './models/customer.interface';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
      providers: [
        PhoneValidationService,
        EmailValidationService,
        AccountNumberValidation,
        DuplicationValidationService,
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize customerList from local storage on ngOnInit', () => {
    const customerList:Array<Customer> = [];
    localStorage.setItem('customerList', JSON.stringify(customerList));

    component.ngOnInit();

    expect(component.customerList).toEqual(customerList);
  });

  it('should add a customer to the list when submitForm is called', () => {
    component.customerForm.setValue({
      BankAccountNumber: '123485555',
      DateOfBirth: '2000-01-05',
      Email: 'test@example.com',
      Firstname: 'John',
      Lastname: 'Doe',
      PhoneNumber: '09125555555',
    });

    component.submitForm();
    expect(component.customerList.length).toBe(1);
  });

  it('should delete a customer from the list when deleteCustomer is called', () => {
    const customer:Customer= {
      BankAccountNumber: '',
      DateOfBirth: '',
      Email: '',
      Firstname: '',
      Lastname: '',
      PhoneNumber: ''
    };
    component.customerList = [customer];

    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteCustomer(customer);

    expect(component.customerList.length).toBe(0);
  });

  it('should edit a customer when editCustomer is called', () => {
    const customer:Customer= {
      BankAccountNumber: '555555555',
      DateOfBirth: '1371-05-05',
      Email: 'ddd@gmail.com',
      Firstname: '14574',
      Lastname: '1540',
      PhoneNumber: '09196791889'
    };
    component.editCustomer(customer);

    expect(component.editFlag).toBe(true);
    expect(component.customer).toEqual(customer);
  });

  it('should display an alert if an invalid bank account number is submitted', fakeAsync(() => {
    spyOn(window, 'alert');
    component.customerForm.setValue({
      BankAccountNumber: '123',
      DateOfBirth: '2000-01-07',
      Email: 'test@example.com',
      Firstname: 'John',
      Lastname: 'Doe',
      PhoneNumber: '09196791889',
    });

    // Simulate a duplicated customer by submitting the same data twice
    component.submitForm();
    component.submitForm();
    tick();

    expect(window.alert).toHaveBeenCalledWith('Account number is not valid');
  }));
});
