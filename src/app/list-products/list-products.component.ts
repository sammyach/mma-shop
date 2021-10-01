import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { DataService } from '../data.service';
import { Product } from '../product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [MessageService]
})
export class ListProductsComponent implements OnInit {

  
  currency = 'GHS';
  products: any[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    selectedCategory: string;

    constructor(private ps: ProductService, private primengConfig: PrimeNGConfig,
                 private router: Router, private ds: DataService, private messageService: MessageService,
                 private route: ActivatedRoute) { }


    ngOnInit() {

        this.route.queryParams.subscribe(params => {
          this.selectedCategory = params['cat'];
          console.log('selected cat: ', this.selectedCategory);
          //this.productService.getProducts(this.selectedCategory).then(data => this.products = data);
          this.getAllProductItems(this.selectedCategory);
          //console.log('products from list-pro', this.products);
          
          //this.ds.productsStoredFromIndex = this.products;
        });

        
        
      
        

        this.sortOptions = [
            {label: 'Price High to Low', value: '!Price'},
            {label: 'Price Low to High', value: 'Price'}
        ];

        this.primengConfig.ripple = true;
    }

    getAllProductItems(cat){
      this.ps.getAllProducts()
        .subscribe(res => {
          this.products = res;
          this.ds.productsStoredFromIndex = this.products;
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

    onViewDetails(id){
      console.log('details...', id);
      this.router.navigate(['/product', id, 'details']);
    }

    onAddToCart(product){
      this.ds.addToCart(product);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Item added to cart successfully'});
    }

}
