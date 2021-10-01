import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-payment-paystack',
  templateUrl: './make-payment-paystack.component.html',
  styleUrls: ['./make-payment-paystack.component.scss']
})
export class MakePaymentPaystackComponent implements OnInit {

  reference = '';
  title;
  constructor() {}

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
  }

  ngOnInit() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

}
