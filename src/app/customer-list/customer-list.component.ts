import { Component, Input, Output } from "@angular/core";
import { Customer } from "../models/customer.interface";
import { Subject } from "rxjs";

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: [
        './customer-list.component.css',
    ]
})
export class CustomerListComponent {
    @Input() customerList: Array<Customer> = [];
    @Output() onDelete: Subject<Customer> = new Subject<Customer>();
    @Output() onEdit: Subject<Customer> = new Subject<Customer>();
    constructor() {}
    editCustomer(customer: Customer) {
        this.onEdit.next(customer);
    }
    deleteCustomer(customer: Customer) {
        this.onDelete.next(customer);
    }
}
