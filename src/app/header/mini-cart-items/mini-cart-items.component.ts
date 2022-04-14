import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-mini-cart-items',
  templateUrl: './mini-cart-items.component.html',
  styleUrls: ['./mini-cart-items.component.scss']
})
export class MiniCartItemsComponent implements OnInit {

  @Input() product: any;
  constructor() { }

  ngOnInit(): void {

  }

}
