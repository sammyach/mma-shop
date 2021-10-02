import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {

  @Input() UserId: number;
  @Output() newAddressEvent = new EventEmitter<any>();
  form: FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      city: [],
      region: [],
      state: [],
      country: [],
      description: []
    })
  }

  onSubmit(){
    console.log('new address in', this.form.value);

    let data: any = {};

    data.City = this.form.get('city').value;
    data.Region = this.form.get('region').value;
    data.Description = this.form.get('description').value;
    data.Country = 'Ghana';
    data.UserId = this.UserId;

    this.ps.addNewAddress(data)
      .subscribe(res => {
        this.newAddressEvent.emit(res);
      })

    // this.auth.register(user)
    //   .subscribe((res: any) => {
    //     console.log('register', res);
    //     this.router.navigate([this.route.snapshot.queryParams.get('redirectUrl')]);
    //     // window.location.reload();
    //   },
    //   error => {
    //     console.log('error logging in', error);
    //     //this.alertify.error(error);
    //   });

    
  }

}
