import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  addOrderForm!: FormGroup;
  showError: boolean = false;
  orderId!: number
  isEdit: boolean = false
  constructor(private router: Router, private formbuilder: FormBuilder, private activatedroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.addOrderForm = this.formbuilder.group({
      orderNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      product: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });
    if (this.activatedroute.snapshot.queryParams['Id'] != undefined) {
      this.orderId = this.activatedroute.snapshot.queryParams['Id']

      this.isEdit = true
    }
  }

  saveOrder() {
    this.showError = true
    if (this.addOrderForm.valid) {
      this.router.navigate(["home/orderList"])
    }
  }
}
