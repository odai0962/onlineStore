import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StepperComponent } from './stepper/stepper.component';
import { AuthenticationsInterceptor } from './interceptor/authentications.interceptor';
import { ErrorHandlingInterceptor } from './interceptor/error-handling.interceptor';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewOrderComponent,
    OrderListComponent,
    NewProductComponent,
    ProductsListComponent,
    NewUserComponent,
    UsersListComponent,
    WarehouseListComponent,
    NewWarehouseComponent,
    StepperComponent,
    Error404Component,
    Error401Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
