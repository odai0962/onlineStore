import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NewWarehouseComponent } from './new-warehouse/new-warehouse.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';
import { authenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [authenticationGuard], children: [
      { path: 'orderList', component: OrderListComponent },
      { path: 'neworder', component: NewOrderComponent },
      { path: 'userList', component: UsersListComponent },
      { path: 'newUser', component: NewUserComponent },
      { path: 'newWarehouse', component: NewWarehouseComponent },
      { path: 'warehouseList', component: WarehouseListComponent },
      { path: 'productsList', component: ProductsListComponent },
      { path: 'newProduct', component: NewProductComponent },
      { path: 'stepper', component: StepperComponent },

    ]
  },
  { path: 'error404', component: Error404Component },
  { path: 'error401', component: Error401Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
