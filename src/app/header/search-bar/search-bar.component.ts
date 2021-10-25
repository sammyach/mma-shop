import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filteredItems: any[];
  selectedItem: any;

  constructor(private ps: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  search(event) {
    console.log('filtering...', event.query);

    this.ps.searchItem(event.query)
      .subscribe(res => {
        this.filteredItems = res;
      })
  }

  viewItem(item){
    console.log(item);
    this.router.navigate(['/product', item.ProductId, 'details']);
  }



}
