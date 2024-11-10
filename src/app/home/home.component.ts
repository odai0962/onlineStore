import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  liMenu: any = [];
  filteredMenu: any = [];
  roles!: string;

  constructor(private router: Router) {
    this.liMenu = Menu; // Directly assigning Menu array
    this.roles = JSON.parse(JSON.stringify(localStorage.getItem('userRole')));

    // Iterate over the liMenu (which is the Menu array)
    this.liMenu.forEach((element: any) => {
      const isInRole = element.role.find((x: any) => x === this.roles);
      if (isInRole !== undefined) {
        this.filteredMenu.push(element);
      }
    });
  }

  logout() {
    localStorage.removeItem('securityKey');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userInfo');
    this.router.navigate(['/']);
  }
}