import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../DTOs/warehouseDTO';
import { Products } from '../DTOs/productsDTO';
import { User } from '../DTOs/UserDTO';
import { Order } from '../DTOs/orderDTO';
import { UsersService } from '../services/users.service';
import { OrdersService } from '../services/orders.service';
import { WarehouseService } from '../services/warehouse.service';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalOrders: number = 0;
  totalProducts: number = 0;
  totalWarehouses: number = 0;
  totalUsers: number = 0;
  higherWarehouseCapacity!: Warehouse[]
  lowerProductStock!: Products[]
  higherProductStock!: Products[]
  higherTotalPriceOrders!: Order[]
  profilImage!: any
  name!: string
  constructor(private userService: UsersService, private orderService: OrdersService, private warehouseService: WarehouseService,
    private productsService: ProductsService, private router: Router) {
    var info = localStorage.getItem('userInfo');
    if (info) {
      var parsedInfo = JSON.parse(info);
      var profilImage = parsedInfo.profileImage;
      this.profilImage = profilImage
      var name = parsedInfo.name
      this.name = name
    } else {
      console.log('No user info found in localStorage');
    }
  }
  ngOnInit(): void {

    this.userService.totalUsers().subscribe({
      next: data => {

        this.totalUsers = data
      }
    });
    this.orderService.totalOrders().subscribe({
      next: data => {

        this.totalOrders = data
      }
    });
    this.orderService.higherTotalPriceOrder().subscribe({ next: data => { this.higherTotalPriceOrders = data } });
    this.warehouseService.totalWarehouses().subscribe({ next: data => { this.totalWarehouses = data } });
    this.warehouseService.higherWarehouseCapacity().subscribe({ next: data => { this.higherWarehouseCapacity = data } });
    this.productsService.totalProducts().subscribe({ next: data => { this.totalProducts = data } });
    this.productsService.lowerProductStock().subscribe({ next: data => { this.lowerProductStock = data } });
    this.productsService.higherProductStock().subscribe({ next: data => { this.higherProductStock = data } });
  }
  navigateToProfile() {

    this.router.navigate(['/home/profile'])
  }
}