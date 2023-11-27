import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomerListComponent } from './customer-list.component';
import { Customer } from '../models/customer.interface';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
    });

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display customer list items', () => {
    const customers: Customer[] = [
      {
        BankAccountNumber: '88888888888',
        Email: 'aa@gmail.com',
        Firstname: 'Steve',
        Lastname: 'Jobs',
        PhoneNumber: '09155555556',
        DateOfBirth: '2005-05-12'
      },
      {
        BankAccountNumber: '88888888888',
        Email: 'aas@gmail.com',
        Firstname: 'John',
        Lastname: 'Doe',
        PhoneNumber: '09155555558',
        DateOfBirth: '2005-07-12'
      },
    ];
    component.customerList = customers;
    fixture.detectChanges();

    const customerElements = fixture.debugElement.queryAll(By.css('.customer-item'));
    expect(customerElements.length).toBe(customers.length);
  });

  it('should emit onDelete event when delete button is clicked', () => {
    const customer: Customer = {
      BankAccountNumber: '88888888888',
      Email: '',
      Firstname: '',
      Lastname: '',
      PhoneNumber: '',
      DateOfBirth: ''
    };
    component.customerList = [customer];
    fixture.detectChanges();

    spyOn(component.onDelete, 'next');
    const deleteButton = fixture.debugElement.query(By.css('.delete-btn'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.onDelete.next).toHaveBeenCalledWith(customer);
  });

  it('should emit onEdit event when edit button is clicked', () => {
    const customer: Customer = {
      BankAccountNumber: '88888888888',
      Email: '',
      Firstname: '',
      Lastname: '',
      PhoneNumber: '',
      DateOfBirth: ''
    };
    component.customerList = [customer];
    fixture.detectChanges();

    spyOn(component.onEdit, 'next');
    const editButton = fixture.debugElement.query(By.css('.edit-btn'));
    editButton.triggerEventHandler('click', null);

    expect(component.onEdit.next).toHaveBeenCalledWith(customer);
  });
});
