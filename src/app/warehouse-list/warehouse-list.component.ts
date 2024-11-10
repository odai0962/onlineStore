import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/warehouseDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  warehouses!: Warehouse[]
  @ViewChild('searchText') location!: ElementRef
  constructor(private router: Router, private warehouseService: WarehouseService) { }
  newWarehouse() {
    this.router.navigate(["home/newWarehouse"])
  }

  search() {
    if (this.location.nativeElement.value.length == 0) {
      this.reloadWarehouse()
    } else {
      this.warehouseService.searchByLocation(this.location.nativeElement.value).subscribe({
        next: data => {
          if (data.length == 0) {
            Swal.fire("no data found!");
            this.reloadWarehouse()

          } else {
            this.warehouses = data
          }

        },
        error: e => {
          this.reloadWarehouse()
        }
      })

    }
  }

  ngOnInit(): void {
    this.reloadWarehouse()
  }
  edit(Id: number) {
    this.router.navigate(['home/newWarehouse'], { queryParams: { Id: Id } })
  }
  deleteWarehouse(id: number) {
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
        this.warehouseService.deleteWarehouse(id).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your warehouse has been deleted.",
              icon: "success"
            });
            this.reloadWarehouse()
          },

        });

      }
    });

  }

  reloadWarehouse() {
    this.warehouseService.loadAllWarehouses().subscribe({
      next: data => {
        this.warehouses = data
      },

    })
  }
}
