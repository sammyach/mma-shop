import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ps: ProductService) { }

  orderId;
  orderStatusList;
  selectedStatus;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('params', params);

      this.orderId = +params.get('id');
      console.log('id', this.orderId);
      // this.getProductData(id);

    })

    this.ps.getAllOrderStatuses()
      .subscribe(res => {
        this.orderStatusList = res;
      })
  }

  onUpdateOrderStatus(e){
    console.log('updating...', e);

    const data: any = {};
    data.Id = this.orderId;
    data.StatusId = +e.value;

    this.ps.updateOrderStatus(data)
      .subscribe(res => {
        this.selectedStatus = null;
        window.location.reload();
      })

  }

}
