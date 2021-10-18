import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-customer-order-details',
  templateUrl: './customer-order-details.component.html',
  styleUrls: ['./customer-order-details.component.scss']
})
export class CustomerOrderDetailsComponent implements OnInit {

  @Input() OrderId: number;
  order;
  orderItems;
  shippingAddress;
  constructor(private ps: ProductService, private router: Router) { }

  ngOnInit(): void {

    this.ps.getOrderById(this.OrderId)
      .subscribe(res => {
        this.order = res.Order;
        this.orderItems = res.OrderItems;
        this.shippingAddress = res.ShippingAddress;
        console.log(res);

      })
  }

  makePayment(){
    this.router.navigate(['checkout/make-payment', this.OrderId])
  }



}
