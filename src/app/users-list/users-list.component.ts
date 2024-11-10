import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../DTOs/UserDTO';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.Component.html',
  styleUrls: ['./users-list.Component.css']
})
export class UsersListComponent implements OnInit {
  users!: User[]
  profilImage!: any
  @ViewChild('searchText') name!: ElementRef
  constructor(private router: Router, private usersService: UsersService) {
    var info = localStorage.getItem('userInfo');
    if (info) {
      var parsedInfo = JSON.parse(info);
      var profilImage = parsedInfo.profileImage;
      this.profilImage = profilImage
    } else {
      console.log('No user info found in localStorage');
    }
  }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll() {
    debugger
    this.usersService.loadAllUsers().subscribe({
      next: data => {
        debugger
        this.users = data
      },
    })
  }
  search() {

    if (this.name.nativeElement.value.length == 0) {
      this.loadAll()
    } else {
      this.usersService.searchByName(this.name.nativeElement.value).subscribe({
        next: data => {
          if (data.length == 0) {
            Swal.fire("no data found!");
            this.loadAll()
          } else {
            this.users = data
          }

        },
        error: e => {
          this.loadAll()
        }
      })

    }
  }
  newUser() {
    this.router.navigate(['home/newUser']);
  }

  edit(id: string) {
    this.router.navigate(['/home/newUser'], { queryParams: { Id: id } })
  }

  deleteUser(id: string) {

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
        this.usersService.deleteUser(id).subscribe({
          next: data => {
            Swal.fire({
              title: "Deleted!",
              text: "Your User has been deleted.",
              icon: "success"
            });
            this.loadAll()
          },

        })

      }
    });

  }
  navigateToProfile() {

    this.router.navigate(['/home/profile'])
  }

}
