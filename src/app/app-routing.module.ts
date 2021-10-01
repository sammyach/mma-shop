import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
//import { MakePaymentComponent } from 'flutterwave-angular-v3';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MakePaymentPaystackComponent } from './checkout/make-payment-paystack/make-payment-paystack.component';
import { MakePaymentComponent } from './checkout/make-payment/make-payment.component';
import { HomeComponent } from './home/home.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '/', component: HomeComponent},
  {path: 'products', component: ListProductsComponent},
  {path: 'product/:id/details', component: ProductDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkout/make-payment', component: MakePaymentComponent},
  {path: 'checkout/make-payment-paystack', component: MakePaymentPaystackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account/new', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
