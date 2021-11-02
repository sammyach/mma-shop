import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CreateAddressComponent } from './account/address-book/create-address/create-address.component';
import { CustomerOrdersComponent } from './account/customer-orders/customer-orders.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { IndexComponent } from './admin/index/index.component';
import { ProductManagerComponent } from './admin/product-manager/product-manager.component';
//import { MakePaymentComponent } from 'flutterwave-angular-v3';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MakePaymentPaystackComponent } from './checkout/make-payment-paystack/make-payment-paystack.component';
import { MakePaymentComponent } from './checkout/make-payment/make-payment.component';
import { HomeComponent } from './home/home.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '/', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'customer/account/new', component: RegisterComponent},
  {path: 'products', component: ListProductsComponent},
  {path: 'product/:id/details', component: ProductDetailsComponent},
  {path: 'cart', component: CartComponent},

  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'checkout/make-payment/:id', component: MakePaymentComponent, canActivate: [AuthGuard]},
  {path: 'checkout/make-payment-paystack', component: MakePaymentPaystackComponent, canActivate: [AuthGuard]},
  {path: 'customer/account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'customer/account/address/create', component: CreateAddressComponent, canActivate: [AuthGuard]},
  {path: 'customer/account/orders', component: CustomerOrdersComponent, canActivate: [AuthGuard]},

  {path: 'admin', component: IndexComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] }},
  {path: 'admin/product-manager', component: ProductManagerComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] }},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
