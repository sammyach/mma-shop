import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  shippingForm;

  readOnly = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createShippingForm();
  }

  createShippingForm(){
    this.shippingForm = this.fb.group({
      fullname: [],
      phone: [],
      email: [],
      city: [],
      region: [],
      country: [],
      digitalAddress:[]
    })
  }

  proceedToPay(){}
}
