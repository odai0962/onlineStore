import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../DTOs/productsDTO';
import { ProductsService } from '../services/products.service';
import { Warehouse } from '../DTOs/warehouseDTO';
import { WarehouseService } from '../services/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  addProductForm!: FormGroup;
  showError: boolean = false;
  warehouses!: Warehouse[]
  productId!: number
  image?: any = ''
  isEdit: boolean = false
  imageError: boolean = false;
  warehouseId!: number
  constructor(private formBuilder: FormBuilder, private router: Router,
    private prodectService: ProductsService, private warehouseService: WarehouseService,
    private activatedRoute: ActivatedRoute) {
    var info = localStorage.getItem('userInfo');
    if (info) {

      var parsedInfo = JSON.parse(info);
      var warehouseId = parsedInfo.warehouseId
      this.warehouseId = warehouseId
    } else {
      console.log('No user info found in localStorage');
    }

  }

  ngOnInit(): void {

    this.addProductForm = this.formBuilder.group({
      Id: [''],
      productName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      description: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      SKU: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
      warehouse: ['']
    });

    if (this.activatedRoute.snapshot.queryParams['Id'] != undefined) {
      this.productId = this.activatedRoute.snapshot.queryParams['Id']
      this.isEdit = true
      this.edit()
    }
  }
  update() {
    this.showError = true; // Set to true when button is clicked
    if (this.addProductForm.valid) {
      var product = new Products();
      product.productId = this.productId
      product.name = this.addProductForm.value['productName']
      product.description = this.addProductForm.value['description']
      product.image = this.image
      product.price = parseFloat(this.addProductForm.value['price'])
      product.sku = this.addProductForm.value['SKU']
      product.stock = parseInt(this.addProductForm.value['stock'])
      product.warehouseId = this.warehouseId
      product.image = this.image
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {

        if (result.isConfirmed) {
          this.prodectService.updateProduct(product).subscribe({
            next: data => {
              Swal.fire("Saved!", "", "success");
              this.router.navigate(["/home/productsList"]);
            },

          })

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          this.router.navigate(["/home/productsList"]);
        }
      });


    }
  }
  edit() {

    this.prodectService.getProductById(this.productId).subscribe({
      next: data => {
        this.addProductForm.controls['productName'].setValue(data.name)
        this.addProductForm.controls['description'].setValue(data.description)
        this.addProductForm.controls['SKU'].setValue(data.sku)
        this.addProductForm.controls['stock'].setValue(data.stock)
        this.addProductForm.controls['price'].setValue(data.price)

        this.image = data.image
      },

    })
  }


  saveBtn() {
    this.showError = true;
    if (this.addProductForm.valid) {
      var product = new Products();
      product.name = this.addProductForm.value['productName']
      product.description = this.addProductForm.value['description']
      product.image = this.image
      product.price = parseFloat(this.addProductForm.value['price'])
      product.sku = this.addProductForm.value['SKU']
      product.stock = parseInt(this.addProductForm.value['stock'])
      product.warehouseId = this.warehouseId
      product.image = this.image
      Swal.fire({
        title: "Do you want to add this product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Add",
        denyButtonText: `Don't Add`

      }).then((result) => {

        if (result.isConfirmed) {
          this.prodectService.addProduct(product).subscribe({
            next: data => {

              Swal.fire("Saved!", "", "success");
              this.router.navigate(["/home/productsList"]);
            },
          })

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
          this.router.navigate(["/home/productsList"]);
        }
      });


    }
  }

  onFileChange(file: any) {

    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (_file) => {
      this.image = reader.result
    }
  }
  // reloadWarehouse() {
  //   this.warehouseService.loadAllWarehouses().subscribe({
  //     next: data => {
  //       this.warehouses = data
  //     },

  //   })
  // }
}
