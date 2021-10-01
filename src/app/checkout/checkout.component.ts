import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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
  constructor(private fb: FormBuilder, private router: Router, private ds: DataService) { }

  ngOnInit(): void {
    this.createShippingForm();
    this.items = this.ds.shoppingCartItems;  
    this.subTotal = this.ds.calculateSubTotal();
    this.total = this.shippingCost + this.subTotal;
    // this.ds.getItems()
    //   .subscribe(res=>{
    //     console.log('items: frm checkout ', res);
        
    //     this.items = res;
    //   })
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

  onSubmit(){
    console.log('submitting shipping info', this.shippingForm.value);
    
  }

  proceedToPay(){
    this.router.navigate(['checkout/make-payment-paystack'])
  }
}
