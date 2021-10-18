import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProductService } from 'src/app/_services/product.service';

export class OrderItemModel{
  OrderId?:number;
  ProductName?: string;
  Status?: string;
  DateCreated?: Date;
}

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  @Output() viewOrderDetail = new EventEmitter<number>();
  orders;
  orderItems: any[];//: OrderItemModel[]= [];

  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.getCustomerOrders();

    this.sortOptions = [
      {label: 'Awaiting Shipment', value: '!Price'},
      {label: 'Price Low to High', value: 'Price'}
    ];
  }

  getCustomerOrders(){
    this.ps.getAllCustomerOrders()
    .subscribe(res => {
      this.orders = res.Orders;
      console.log('orders', this.orders);
      // this.orderItems = [];
      // for(let order of this.orders){
      //   console.log(order.Id);
      //   for(let item of order.OrderItems){
      //     console.log(item);
      //     this.orderItems.push(item);
      //   }
      // }
      // console.log(this.orderItems);
    })
  }

  onSortChange(event) {
    console.log('sorting...', event);

    let value = event.value;
    console.log('sort value', value);

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  onViewOrderDetail(id: number){
    console.log('in cux ordr', id);

    this.viewOrderDetail.emit(id);
  }

}
