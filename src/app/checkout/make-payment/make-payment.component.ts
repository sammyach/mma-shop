import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  

  reference = '';
  title;
  order;
  amountInPesewas;
  customerEmail;
  constructor(private route: ActivatedRoute, private ps: ProductService, private ds: DataService, private router: Router) {}  

  ngOnInit() {
    

    this.route.paramMap.subscribe(params => {
      console.log('params', params);
      
      let id:number = +params.get('id');
      console.log('id', id);
      this.getOrderData(id);
    })

    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    //this.reference = `ref-${new Date().getTime.toString()}`;
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);

    //fulfill payment
    const data: any = {};
    data.OrderId = this.order.Id;
    data.Reference = ref.reference;
    data.Response = `status:${ref.status}-message:${ref.message}`;
    this.ps.fulfillPayment(data)
      .subscribe(res => {
        
        // empty cart
        this.ds.emptyCart();
        //nav to customer order view
        this.router.navigate(['customer/account'])
      }, err=>{
        console.log('error fulfilling payment', err);
        
      })
  }

  paymentCancel() {
    console.log('payment failed');
  }

  getOrderData(id){
    this.ps.getOrderById(id)
      .subscribe(res => {
        this.order = res.Order;
        this.amountInPesewas = this.order.TotalAmount * 100;
        this.customerEmail = res.UserEmail;
        console.log(res);
        console.log(this.customerEmail);
        
      })
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }

}
