import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Products } from '../DTOs/productsDTO';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../DTOs/orderDTO';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  products!: Products[]
  selectedRow: number | null = null;
  productId!: number
  addOrderForm!: FormGroup
  isSelectedProduct: boolean = true
  selectedProduct!: Products
  isEdit: boolean = false
  isValidatForm: boolean = true
  updatedProductId!: number
  order!: Order
  @ViewChild('searchText') name!: ElementRef
  step: number = 1;  // Keeps track of the current step
  constructor(private service: ProductsService, private activatedRoute: ActivatedRoute, private ordersService: OrdersService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.reloadProducts()
    this.addOrderForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      orderDate: ['', Validators.required],
      orderState: ['', Validators.required],
      quantity: ['', Validators.required],
      // ['', Validators.compose([Validators.required, Validators.max(this.selectedProduct.stock)])],
      paymentMethod: ['', Validators.required],
      productId: [''],
      orderId: ['']
    })
    if (this.activatedRoute.snapshot.queryParams['Id'] != undefined) {
      this.updatedProductId = this.activatedRoute.snapshot.queryParams['Id']
      this.isEdit = true
      this.edit();
      this.isSelectedProduct = false
    }
    this.addOrderForm.statusChanges.subscribe(status => {
      this.isValidatForm = this.addOrderForm.invalid; // If form is invalid, set to true, else false
    });
  }

  edit() {

    this.ordersService.getOrderById(this.updatedProductId).subscribe({
      next: data => {

        this.addOrderForm.controls['customerName'].setValue(data.customerName),
          this.addOrderForm.controls['shippingAddress'].setValue(data.shippingAddress),
          this.addOrderForm.controls['orderDate'].setValue(formatDate(data.orderDate, 'yyyy-MM-dd', 'en'))
        this.addOrderForm.controls['orderState'].setValue(data.orderStatus),
          this.addOrderForm.controls['quantity'].setValue(parseInt(data.quantity)),
          this.addOrderForm.controls['paymentMethod'].setValue(data.paymentmethods),
          this.addOrderForm.controls['customerName'].setValue(data.customerName),
          this.addOrderForm.controls['orderId'].setValue(data.orderId)
        this.selectedRow = data.productId
        this.productId = data.productId

      }
    });
  }

  // Method to set the current step
  setStep(stepNumber: number) {
    this.step = stepNumber;
    if (stepNumber == 2) {
      this.service.getProductById(this.productId).subscribe({
        next: data => {
          this.selectedProduct = data

        },

      });
    }
    if (stepNumber == 3 && this.isEdit == false) {
      var newOrder = new Order();
      newOrder.customerName = this.addOrderForm.value['customerName'],
        newOrder.orderDate = this.addOrderForm.value['orderDate'],
        newOrder.orderStatus = this.addOrderForm.value['orderState'],
        newOrder.quantity = this.addOrderForm.value['quantity'],
        newOrder.shippingAddress = this.addOrderForm.value['shippingAddress'],
        newOrder.productId = this.productId,
        newOrder.paymentmethods = this.addOrderForm.value['paymentMethod']
      newOrder.totalPrice = this.addOrderForm.value['quantity'] * this.selectedProduct.price

      this.order = newOrder
    } else if (stepNumber == 3 && this.isEdit == true) {
      var updatedOrder = new Order();
      updatedOrder.customerName = this.addOrderForm.value['customerName'],
        updatedOrder.orderDate = this.addOrderForm.value['orderDate'],
        updatedOrder.orderStatus = this.addOrderForm.value['orderState'],
        updatedOrder.quantity = this.addOrderForm.value['quantity'],
        updatedOrder.shippingAddress = this.addOrderForm.value['shippingAddress'],
        updatedOrder.productId = this.productId,
        updatedOrder.paymentmethods = this.addOrderForm.value['paymentMethod']
      updatedOrder.totalPrice = this.addOrderForm.value['quantity'] * this.selectedProduct.price
      updatedOrder.orderId = this.updatedProductId
      this.order = updatedOrder
    }
  }



  addOrder() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ordersService.addOrder(this.order).subscribe({
          next: data => {
            Swal.fire("Saved!", "", "success");
            this.router.navigate(['home/orderList'])
          },
        })

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        this.router.navigate(['home/orderList'])
      }
    });


  }

  updateOrder() {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ordersService.updateOrder(this.order).subscribe({
          next: data => {
            Swal.fire("Saved!", "", "success");
            this.router.navigate(['home/orderList'])
          },
        })

      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        this.router.navigate(['home/orderList'])
      }
    });

  }
  reloadProducts() {
    this.service.loadAllProducts().subscribe({
      next: data => {
        this.products = data

      },
    });
  }
  search() {

    if (this.name.nativeElement.value.length == 0) {
      console.log("not found")
      this.reloadProducts()
    } else {
      this.service.searchByName(this.name.nativeElement.value).subscribe({
        next: data => {
          if (data.length == 0) {
            console.log("not found")
            this.products = data
          } else {
            this.products = data
          }

        },
        error: e => {
          this.reloadProducts()

        }
      })

    }

  }

  selectRow(productId: number) {
    this.selectedRow = this.selectedRow === productId ? null : productId; // Toggle selection based on productId
    this.productId = productId;
    this.isSelectedProduct = false;
  }


}
