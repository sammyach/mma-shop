import { Component } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Product } from './product';
import { ProductService } from './product.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop';

  constructor(public auth: AuthService){

  }
}
