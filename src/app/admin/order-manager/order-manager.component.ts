import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class OrderManagerComponent implements OnInit {

  constructor(private ps: ProductService, private router: Router) { }

  orders: any[];

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.ps.getAllOrders()
      .subscribe(res => {
        this.orders = res;
      })
  }

  onViewDetails(id){
    console.log('details...', id);
    this.router.navigate(['/admin/manage/orders', id, 'details']);
  }

}
