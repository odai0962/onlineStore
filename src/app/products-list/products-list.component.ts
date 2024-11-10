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
  @ViewChild('searchText') name!: ElementRef
  constructor(private router: Router, private service: ProductsService) { }
  newProduct() {
    this.router.navigate(['home/newProduct'])
  }
  ngOnInit(): void {
    this.reloadProducts()
  }

  edit(Id: number) {
    this.router.navigate(['home/newProduct'], { queryParams: { Id: Id } })
  }

  search() {

    if (this.name.nativeElement.value.length == 0) {
      this.reloadProducts()
    } else {
      this.service.searchByName(this.name.nativeElement.value).subscribe({
        next: data => {
          if (data.length == 0) {
            Swal.fire("no data found!");
            this.reloadProducts()

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

  reloadProducts() {
    this.service.loadAllProducts().subscribe({
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
            this.reloadProducts()
          },

        })

      }
    });

  }
}
