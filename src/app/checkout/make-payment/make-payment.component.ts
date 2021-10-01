import { Component, OnInit } from '@angular/core';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  

  publicKey = "FLWPUBK_TEST-9f4920ee7e00503eec7401a810431bf5-X";

  customerDetails = { name: 'Demo Customer  Name', email: 'sammyachman@gmail.com', phone_number: '0544073772'};

  customizations = {title: 'Customization Title', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'};

  meta = {'consumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'};

 paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: 1,
    currency: 'GHS',
    payment_options: 'card,mobilemoneyghana',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }
  //Inject the flutterwave service 
  constructor(private flutterwave: Flutterwave) {
  }

  ngOnInit(): void {
  }

  makePayment(){
    this.flutterwave.inlinePay(this.paymentData)
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

}
