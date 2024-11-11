import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  liMenu: any = [];
  filteredMenu: any = [];
  roles!: string;
  @ViewChild('language') language!: ElementRef
  constructor(private router: Router, private translate: TranslateService) {
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
  changeLanguage() {
    this.translate.use(this.language.nativeElement.value);
    if (this.language.nativeElement.value == 'ar') {
      document.getElementsByTagName('body')[0].dir = 'rtl'
    } else {
      document.getElementsByTagName('body')[0].dir = 'ltr'
    }
  }
}