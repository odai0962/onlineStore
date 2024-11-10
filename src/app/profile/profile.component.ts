import { Component, OnInit } from '@angular/core';
import { User } from '../DTOs/UserDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserDTO } from '../DTOs/AddUserDTO';
import { PasswordDTO } from '../DTOs/passwordDTO';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo!: any
  changePasswordForm!: FormGroup
  constructor(private builder: FormBuilder, private userService: UsersService) {

    var info = localStorage.getItem('userInfo');
    var role = localStorage.getItem('userRole');
    if (info && role) {
      var parsedInfo = JSON.parse(info);
      var roles = []
      roles.push(role)
      var userInfo = new User()
      userInfo.email = parsedInfo.email;
      userInfo.name = parsedInfo.name;
      userInfo.phoneNumber = parsedInfo.phoneNumber;
      userInfo.profileImage = parsedInfo.profileImage;
      userInfo.userName = parsedInfo.userName;
      userInfo.warehouseId = parsedInfo.warehouseId;
      userInfo.roles = roles
      this.userInfo = userInfo
      console.log(this.userInfo)
    } else {
      console.log('No user info found in localStorage');
    }
  }
  ngOnInit(): void {
    this.changePasswordForm = this.builder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  changePasswordBtn() {
    if (this.changePasswordForm.valid) {
      var userPassword = new PasswordDTO()
      userPassword.currentPassword = this.changePasswordForm.controls['currentPassword'].value
      userPassword.newPassword = this.changePasswordForm.controls['newPassword'].value
      userPassword.confirmPassword = this.changePasswordForm.controls['confirmPassword'].value

      if (userPassword.newPassword == userPassword.confirmPassword) {
        Swal.fire({
          title: "Do you want to change your password?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Add",
          denyButtonText: `Don't Add`

        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.changePassword(userPassword.currentPassword, userPassword.newPassword, this.userInfo).subscribe({
              next: data => {
                Swal.fire("Saved!", "", "success");
              }
            })
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");

          }
        });

      } else {
        Swal.fire("password are not confirm", "", "info");
      }
    }
  }
}
