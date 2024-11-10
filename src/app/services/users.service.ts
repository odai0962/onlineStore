import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserDTO } from '../DTOs/AddUserDTO';
import { User } from '../DTOs/UserDTO';
import { Login } from '../DTOs/loginDTO';
import { Role } from '../DTOs/RoleDTOs';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURl = ''
  constructor(private client: HttpClient) {
    this.baseURl = environment.apiUrl
  }

  loadAllUsers(): Observable<any> {

    return this.client.get(this.baseURl + '/api/Account/loadAllUsers')
  }
  addUser(user: AddUserDTO): Observable<any> {
    return this.client.post(this.baseURl + '/api/Account/SignUp', user)
  }
  deleteUser(id: string): Observable<any> {

    return this.client.delete(this.baseURl + '/api/Account/deleteUser?id=' + id)
  }
  getUserById(Id: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Account/getUserById?Id=' + Id)
  }
  updateUser(user: User): Observable<any> {
    return this.client.put(this.baseURl + '/api/Account/updateUser', user)
  }
  login(login: Login): Observable<any> {

    return this.client.post(this.baseURl + '/api/Account/SignIn?signinDTO=', login)
  }
  getRoleByUserName(userName: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Account/getRoleByUserName?userName=' + userName)
  }
  getUserInfo(userName: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Account/getUserInfo?userName=' + userName)
  }
  searchByName(name: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Account/searchByName?name=' + name)
  }
  changePassword(currentPassword: string, newPassword: string, user: User): Observable<any> {
    const payload = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      user: user
    };
    return this.client.put(this.baseURl + '/api/Account/changePassword', payload);
  }

}
