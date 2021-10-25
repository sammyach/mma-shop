import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
import {CarouselModule} from 'primeng/carousel';
import {SidebarModule} from 'primeng/sidebar';
import {CheckboxModule} from 'primeng/checkbox';
import {TooltipModule} from 'primeng/tooltip';
import {PasswordModule} from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { Angular4PaystackModule } from 'angular4-paystack';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {AutoCompleteModule} from 'primeng/autocomplete';


import { ListProductsComponent } from './list-products/list-products.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { MiniCartItemsComponent } from './header/mini-cart-items/mini-cart-items.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MakePaymentComponent } from './checkout/make-payment/make-payment.component';
import { MakePaymentPaystackComponent } from './checkout/make-payment-paystack/make-payment-paystack.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AccountComponent } from './account/account.component';
import { AddressBookComponent } from './account/address-book/address-book.component';
import { CreateAddressComponent } from './account/address-book/create-address/create-address.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { CustomerOrdersComponent } from './account/customer-orders/customer-orders.component';
import { CustomerOrderDetailsComponent } from './account/customer-orders/customer-order-details/customer-order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    HomeComponent,
    HeaderComponent,
    ProductDetailsComponent,
    CartComponent,
    MiniCartItemsComponent,
    FooterComponent,
    SearchBarComponent,
    CheckoutComponent,
    MakePaymentComponent,
    MakePaymentPaystackComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AddressBookComponent,
    CreateAddressComponent,
    CustomerOrdersComponent,
    CustomerOrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    BadgeModule,
    TableModule,
    TabViewModule,
    ToastModule,
    MenuModule,
    CarouselModule,
    SidebarModule,
    CheckboxModule,
    TooltipModule,
    PasswordModule,
    TagModule,
    Angular4PaystackModule.forRoot('pk_test_22c6de9f298f39b950cd2e627328fcce2af2b13a'),
    ProgressSpinnerModule,
    AutoCompleteModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
