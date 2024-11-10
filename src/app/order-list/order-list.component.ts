import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Products } from '../DTOs/productsDTO';
import { OrdersService } from '../services/orders.service';
import { Order } from '../DTOs/orderDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders!: Order[]
  @ViewChild('searchText') address!: ElementRef
  profilImage!: any
  profileInfo!: object
  constructor(private router: Router, private ordersService: OrdersService) {
    var info = localStorage.getItem('userInfo');


    if (info) {
      var parsedInfo = JSON.parse(info);
      var profilImage = parsedInfo.profileImage;
      this.profilImage = profilImage
    } else {
      console.log('No user info found in localStorage');
    }
  }
  newOrder() {
    this.router.navigate(["/home/neworder"]);
  }
  ngOnInit(): void {
    this.reloadOrders()
  }
  search() {
    if (this.address.nativeElement.value.length == 0) {
      this.reloadOrders()
    } else {
      this.ordersService.searchByAddress(this.address.nativeElement.value).subscribe({
        next: data => {
          if (data.length == 0) {
            Swal.fire("no data found!");
            this.reloadOrders()

          } else {
            this.orders = data
          }

        },
        error: e => {
          this.reloadOrders()
        }
      })

    }
  }
  edit(Id: number) {
    this.router.navigate(['/home/stepper'], { queryParams: { Id: Id } })
  }

  reloadOrders() {
    this.ordersService.loadAllOrders().subscribe({
      next: data => {
        this.orders = data;
      },

    });
  }
  deleteOrder(id: number) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.deleteOrder(id).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.reloadOrders()
          },

        })

      }
    });

  }
}
