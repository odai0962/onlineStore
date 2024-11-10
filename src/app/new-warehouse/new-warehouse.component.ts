import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from '../DTOs/warehouseDTO';
import { WarehouseService } from '../services/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent {

  addWarehouseForm!: FormGroup;
  showError: boolean = false;
  warehouseId!: number
  isEdit: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router, private warehouseService: WarehouseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.addWarehouseForm = this.formBuilder.group({
      manager: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      location: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      capacity: ['', Validators.required],
      status: ['', Validators.required],
      Id: ['']
    });
    if (this.activatedRoute.snapshot.queryParams['Id'] != undefined) {
      this.warehouseId = this.activatedRoute.snapshot.queryParams['Id']
      this.edit()
      this.isEdit = true
    }
  }

  update() {
    this.showError = true;
    if (this.addWarehouseForm.valid) {

      var warehouse = new Warehouse();
      warehouse.warehouseId = this.warehouseId
      warehouse.manager = this.addWarehouseForm.value['manager']
      warehouse.location = this.addWarehouseForm.value['location']
      warehouse.capacity = parseInt(this.addWarehouseForm.value['capacity'])
      warehouse.status = this.parseBoolean(this.addWarehouseForm.value["status"]);
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.warehouseService.updateWarehouse(warehouse).subscribe({
            next: data => {
              Swal.fire("Saved!", "", "success");
              this.router.navigate(["/home/warehouseList"]);
            },
          })

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          this.router.navigate(["/home/warehouseList"]);
        }
      });


    }
  }
  edit() {
    this.warehouseService.getWarehouseById(this.warehouseId).subscribe({
      next: data => {
        this.addWarehouseForm.controls['Id'].setValue(data.warehouseId)
        this.addWarehouseForm.controls['manager'].setValue(data.manager)
        this.addWarehouseForm.controls['location'].setValue(data.location)
        this.addWarehouseForm.controls['capacity'].setValue(data.capacity)
        this.addWarehouseForm.controls['status'].setValue(data.status)
      }
    })
  }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  }

  saveBtn() {
    this.showError = true;
    if (this.addWarehouseForm.valid) {

      var warehouse = new Warehouse();
      warehouse.manager = this.addWarehouseForm.value['manager']
      warehouse.location = this.addWarehouseForm.value['location']
      warehouse.capacity = parseInt(this.addWarehouseForm.value['capacity'])
      warehouse.status = this.parseBoolean(this.addWarehouseForm.value["status"]);
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.warehouseService.addwharehouse(warehouse).subscribe({
            next: data => {
              Swal.fire("Saved!", "", "success");
              this.router.navigate(["/home/warehouseList"]);
            },

          })

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          this.router.navigate(["/home/warehouseList"]);
        }
      });


    }
  }
}
