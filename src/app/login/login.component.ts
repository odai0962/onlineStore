import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Login } from '../DTOs/loginDTO';
import { Role } from '../DTOs/RoleDTOs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFrom!: FormGroup
  showError: boolean = false;
  @ViewChild('language') language!: ElementRef
  constructor(private formbuilder: FormBuilder, private router: Router,
    private userService: UsersService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.loginFrom = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  loginBtn() {

    this.showError = false; // Reset error state
    if (this.loginFrom.valid) {
      var login = new Login();
      login.username = this.loginFrom.value['username']
      login.password = this.loginFrom.value['password']
      this.userService.login(login).subscribe({
        next: data => {

          localStorage.setItem('securityKey', data.tokenValue)
          this.userService.getRoleByUserName(login.username).subscribe({
            next: role => {

              localStorage.setItem('userRole', role)
            },

          })
          this.userService.getUserInfo(login.username).subscribe({
            next: info => {

              localStorage.setItem('userInfo', JSON.stringify(info))
              this.router.navigate(["home/Dashboard"]);
            },

          })

        },

      })

    } else {
      this.showError = true; // Show error if form is invalid
    }
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
