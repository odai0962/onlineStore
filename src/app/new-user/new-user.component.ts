import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse } from '../DTOs/warehouseDTO';
import { WarehouseService } from '../services/warehouse.service';
import { Role } from '../DTOs/RoleDTOs';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
import { AddUserDTO } from '../DTOs/AddUserDTO';
import { User } from '../DTOs/UserDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  warehouses!: Warehouse[]
  roles!: Role[]
  addUserForm!: FormGroup;
  isEdit: boolean = false
  userId!: string
  imageError: boolean = false;
  profileImage?: any = ''
  showError: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private warehouseService: WarehouseService, private activatedRoute: ActivatedRoute,
    private rolesService: RolesService, private userService: UsersService) { }

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.queryParams['Id'] != undefined) {
      this.userId = this.activatedRoute.snapshot.queryParams['Id']
      this.isEdit = true
      this.edit()
    }



    this.addUserForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern("07(7|8|9)\\d{7}")])],
      roles: ['', Validators.required],
      warehouse: ['', Validators.required]
    });

    if (this.isEdit) {
      this.addUserForm.controls['password'].clearValidators();
      this.addUserForm.controls['password'].updateValueAndValidity();
    }

    this.loadWarehouse()
    this.loadRole()


  }
  update() {

    this.showError = true;
    this.addUserForm.get('password')?.disable();
    if (this.addUserForm.valid) {
      var updateUser = new User()
      updateUser.userId = this.userId
      updateUser.userName = this.addUserForm.value["userName"],
        updateUser.name = this.addUserForm.value["name"],
        updateUser.email = this.addUserForm.value["email"],
        updateUser.phoneNumber = this.addUserForm.value["phoneNumber"],
        updateUser.profileImage = this.profileImage
      updateUser.roles = []
      updateUser.roles.push(this.addUserForm.value["roles"])
      updateUser.warehouseId = parseInt(this.addUserForm.value["warehouse"]),
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {

          if (result.isConfirmed) {
            this.userService.updateUser(updateUser).subscribe({
              next: data => {
                Swal.fire("Saved!", "", "success");
                this.router.navigate(["/home/userList"]);
              },

            })

          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
            this.router.navigate(["/home/userList"]);
          }
        });



    }
  }
  onFileChange(file: any) {
    debugger
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (_file) => {
      this.profileImage = reader.result
    }
  }

  edit() {

    this.userService.getUserById(this.userId).subscribe({
      next: data => {
        this.addUserForm.controls['userName'].setValue(data.userName)
        this.addUserForm.controls['name'].setValue(data.name)
        this.addUserForm.controls['email'].setValue(data.email)
        this.addUserForm.controls['password'].setValue(data.password)
        this.addUserForm.controls['phoneNumber'].setValue(data.phoneNumber)
        this.addUserForm.controls['roles'].setValue(data.roles)
        this.addUserForm.controls['warehouse'].setValue(data.warehouseId)
        this.profileImage = data.profileImage
      }
    })
  }

  saveBtn() {

    this.showError = true;
    if (this.addUserForm.valid) {
      var newUser = new AddUserDTO()
      newUser.userName = this.addUserForm.value["userName"],
        newUser.name = this.addUserForm.value["name"],
        newUser.email = this.addUserForm.value["email"],
        newUser.password = this.addUserForm.value["password"],
        newUser.phoneNumber = this.addUserForm.value["phoneNumber"],
        newUser.profileImage = this.profileImage
      newUser.role = this.addUserForm.value["roles"],
        newUser.warehouseId = parseInt(this.addUserForm.value["warehouse"]),
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.userService.addUser(newUser).subscribe({
              next: data => {
                Swal.fire("Saved!", "", "success");
                this.router.navigate(["/home/userList"]);
              },

            })

          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
            this.router.navigate(["/home/userList"]);
          }
        });



    }
  }


  loadWarehouse() {
    this.warehouseService.loadAllWarehouses().subscribe({
      next: data => {
        this.warehouses = data
      },

    })
  }
  loadRole() {
    this.rolesService.loadAllRoles().subscribe({

      next: data => {
        this.roles = data
      },

    })
  }

}
