import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  items: any[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  form: FormGroup;
  submitted;
  loading = false;

  selectedItem;
  uploadedFiles: any[] = [];
  successfulUpload = false;

  constructor(public ps: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.getItems();
  }

  getItems(){
    this.ps.getAllProducts()
      .subscribe(res => {
        this.items = res;
      })
  }

  createForm(){
    this.form = this.fb.group({
      id: [null],
      productName: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      desc: [null]
    });
  }

  onSubmit(){
    const data: any = {};
    data.Id = this.form.get('id').value;
    data.Name = this.form.get('productName').value;
    data.Description = this.form.get('desc').value;
    data.Price = this.form.get('price').value;
    data.Quantity = this.form.get('quantity').value;
    this.ps.updateProductItem(data)
      .subscribe(res => {

      })
  }

  onEdit(id){
    const item = this.selectedItem = this.items.find(e=>e.Id === id);
    console.log(item);

    this.form.patchValue({
      id: item.Id,
      productName : item.Name,
      desc: item.Description,
      price: item.Price,
      quantity: item.Quantity
    })

    console.log(this.form.get('productName').value);

  }

  onRemove(img){
    this.ps.removeImage(img.Id)
      .subscribe(res => {
        const index = this.selectedItem.ProductImages.indexOf(img);
        if(index > -1){
          this.selectedItem.ProductImages.splice(index, 1);
        }
      })
  }

  onUpload(event){
    for(let file of event.files) {
      console.log(file);
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
    const formData = new FormData();
    this.uploadedFiles.forEach((f) => formData.append('files', f));

    this.ps.uploadFiles(this.selectedItem.Id, formData)
        .subscribe(res => {
          console.log(res);
          this.successfulUpload = true;
          this.selectedItem = res;
        })
  }

}
