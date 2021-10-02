import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  UseMyShippingAddress = true;
  constructor(private fb: FormBuilder, private router: Router, private ds: DataService, private auth: AuthService, private ps: ProductService) {
    this.auth.currentUser.subscribe(x => {this.currentUser = x;});

   }

  ngOnInit(): void {
    this.createShippingForm();
    this.items = this.ds.shoppingCartItems;  
    this.subTotal = this.ds.calculateSubTotal();
    this.total = this.shippingCost + this.subTotal;

    this.customer = this.ps.getCustomerById(this.currentUser?.Id)
      .subscribe(res=>{
        console.log('cus in  checkout', res);
        
        this.customer = res;  
        this.setFormWithDefaultAddress();
      })

    // this.ds.getItems()
    //   .subscribe(res=>{
    //     console.log('items: frm checkout ', res);
        
    //     this.items = res;
    //   })
  }

  setFormWithDefaultAddress(){
    this.shippingForm.get('fullname').setValue(this.customer.FirstName + ' ' + this.customer.LastName); 
    this.shippingForm.get('phone').setValue(this.customer.Phone);
    this.shippingForm.get('email').setValue(this.customer.Email);
    this.shippingForm.get('city').setValue(this.customer?.UserAddresses[0]?.City); 
    this.shippingForm.get('region').setValue(this.customer?.UserAddresses[0]?.Region);
    this.shippingForm.get('country').setValue(this.customer?.UserAddresses[0]?.Country);
    this.shippingForm.get('streetAddress').setValue(this.customer?.UserAddresses[0]?.Description);
  }

  createShippingForm(){    
    this.shippingForm = this.fb.group({
      fullname: [null, Validators.required],
      phone: [],
      email: [],
      city: [],
      region: [],
      country: [],
      digitalAddress:[],
      streetAddress: []
    })
  }

  OnCheckboxChange(e){
    console.log('checkbox', e);
    this.UseMyShippingAddress = e.checked;
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
    console.log('submitting shipping info', this.shippingForm.value);
    
  }

  proceedToPay(){
    this.router.navigate(['checkout/make-payment-paystack'])
  }
}
