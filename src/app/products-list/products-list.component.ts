import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../DTOs/productsDTO';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products!: Products[]
  profilImage!: any
  minPrice: number = 0;
  maxPrice: number = 1000;
  warehouseId!: number
  @ViewChild('searchText') name!: ElementRef
  constructor(private router: Router, private service: ProductsService) {
    var info = localStorage.getItem('userInfo');

    if (info) {

      var parsedInfo = JSON.parse(info);
      var profilImage = parsedInfo.profileImage;
      this.profilImage = profilImage
      var warehouseId = parsedInfo.warehouseId
      this.warehouseId = warehouseId
    } else {
      console.log('No user info found in localStorage');
    }
  }
  newProduct() {
    this.router.navigate(['home/newProduct'])
  }
  ngOnInit(): void {
    this.loadAllProductByWarehouseId()
    console.log(this.loadAllProductByWarehouseId())
  }

  edit(Id: number) {
    this.router.navigate(['home/newProduct'], { queryParams: { Id: Id } })
  }

  search() {

    if (this.name.nativeElement.value.length == 0) {
      this.loadAllProductByWarehouseId()
    } else {
      this.service.searchByName(this.name.nativeElement.value, this.warehouseId).subscribe({
        next: data => {
          if (data.length == 0) {
            Swal.fire("no data found!");
            this.loadAllProductByWarehouseId()

          } else {
            this.products = data
          }

        },
        error: e => {
          this.loadAllProductByWarehouseId()
        }
      })

    }

  }

  // reloadProducts() {
  //   this.service.loadAllProducts().subscribe({
  //     next: data => {
  //       this.products = data

  //     },
  //   });
  // }

  loadAllProductByWarehouseId() {

    this.service.loadAllProductByWarehouseId(this.warehouseId).subscribe({
      next: data => {

        this.products = data

      },
    });
  }


  deleteProduct(id: number) {
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
        this.service.deleteProduct(id).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success"
            });
            this.loadAllProductByWarehouseId()
          },

        })

      }
    });

  }

  seachByPriceAvarge() {
    this.service.seachByPriceAvarge(this.minPrice, this.maxPrice, this.warehouseId).subscribe({
      next: data => {
        this.products = data
      }
    })

  }
  onOrderByChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'ascending') {
      this.seachByAce();
    } else if (selectedValue === 'descending') {
      this.seachByDec();
    }
  }
  seachByDec() {

    this.service.seachByDec(this.warehouseId).subscribe({
      next: data => {

        this.products = data
      }
    })
  }
  seachByAce() {

    this.service.seachByAce(this.warehouseId).subscribe({
      next: data => {
        this.products = data
      }
    })
  }
  navigateToProfile() {

    this.router.navigate(['/home/profile'])
  }


}
