import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../_services/auth.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  subTotal=0;
  shippingCost=0;
  total=0;
  shippingForm;
  items;
  readOnly = false;
  currentUser;
  customer;
  UseMyShippingAddress = false;
  shippingAddressId = 0;
  showSubmitBtn = false;
  showPlaceOrderBtn: boolean;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private ds: DataService, private auth: AuthService, private ps: ProductService) {
    this.auth.currentUser.subscribe(x => {this.currentUser = x;});

   }

  ngOnInit(): void {
    this.createShippingForm();

    this.ds.getCartItems();
    this.ds.getItems()
        .subscribe(res => {
          this.items = res;
          //this.totalItemsInCart = this.items?.reduce((a, b) => +a + +b.Quantity, 0);
          this.subTotal = this.ds.calculateSubTotal();
          this.total = this.shippingCost + this.subTotal;
        })
    // this.items = this.ds.shoppingCartItems;




    this.customer = this.ps.getCustomerWithAddressesById(this.currentUser?.id)
      .subscribe(res=>{

        this.customer = res;
        this.setFormWithDefaultAddress();
      });



    // this.ds.getItems()
    //   .subscribe(res=>{
    //     console.log('items: frm checkout ', res);

    //     this.items = res;
    //   })
  }

  setFormWithDefaultAddress(){
    const defaultAddress = this.customer?.UserAddresses?.find(e=>e.IsDefault == true);
    if(this.customer?.UserAddresses?.length == 0 && defaultAddress == null){
      //there's no address set at all. force user to set address;
      this.UseMyShippingAddress = false;
      this.showSubmitBtn = true;
      return;
    }

    this.UseMyShippingAddress = true;
    this.shippingAddressId = defaultAddress?.Id;
    if(this.shippingAddressId > 0) this.showPlaceOrderBtn = true;
    this.shippingForm.get('fullname').setValue(defaultAddress?.FullName);
    this.shippingForm.get('phone').setValue(defaultAddress?.Phone);
    //this.shippingForm.get('email').setValue(this.customer.Email);
    this.shippingForm.get('city').setValue(defaultAddress?.City);
    this.shippingForm.get('region').setValue(defaultAddress?.Region);
    this.shippingForm.get('country').setValue(defaultAddress?.Country);
    this.shippingForm.get('streetAddress').setValue(defaultAddress?.StreetAddress);
  }

  createShippingForm(){
    this.shippingForm = this.fb.group({
      fullname: [null, Validators.required],
      phone: [],
      // email: [],
      city: [],
      region: [],
      country: [],
      digitalAddress:[],
      streetAddress: []
    })
  }

  OnCheckboxChange(e){
    this.UseMyShippingAddress = e.checked;
    this.showSubmitBtn = !this.UseMyShippingAddress;
    if(this.showSubmitBtn) this.showPlaceOrderBtn = false;
    if(this.UseMyShippingAddress){
      this.setFormWithDefaultAddress();
    }else{
      this.resetForm();
    }
  }

  resetForm(){
    this.shippingForm.reset();
  }

  onSubmit(){
    this.showPlaceOrderBtn = true;

    const data: any = {};
    data.FullName = this.shippingForm.get('fullname').value;
    data.Phone = this.shippingForm.get('phone').value;
    data.City = this.shippingForm.get('city').value;
    data.Region = this.shippingForm.get('region').value;
    data.Country = this.shippingForm.get('country').value;
    data.StreetAddress = this.shippingForm.get('streetAddress').value;
    data.DigitalAddress = this.shippingForm.get('digitalAddress').value;
    if(this.customer?.UserAddresses?.length == 0){
      data.IsDefault = true;
    }else{
      data.IsDefault = false;
    }


    this.ps.addShippingInfo(data)
      .subscribe(res => {
        this.shippingAddressId = res;
      })
  }

  placeOrder(){
    if(!this.auth.loggedIn){
      this.router.navigate(['login'], {queryParams: {redirectUrl: this.route.snapshot.url}});
      return;
    }

    const orders: any[] = [];

    if(this.items.length <=0) return;

    for(let item of this.items){
      const orderItem: any = {};
      orderItem.ProductId = item.ProductId;
      orderItem.Quantity = item.Quantity;
      orders.push(orderItem);
    }

    const data: any = {};
    data.Orders = orders;
    data.ShippingAddressId = this.shippingAddressId;

    this.ps.placeOrder(data)
      .subscribe(res => {

        //this.router.navigate(['checkout/make-payment-paystack', res.Id])
        this.router.navigate(['checkout/make-payment', res.Id])
      })

      //this.router.navigate(['checkout/make-payment', 1])
  }
}
