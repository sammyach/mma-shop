import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      firstname: [],
      lastname: [],
      email: [],
      phone: [],
      password: []
    });
  }

  onSubmit(){
    console.log('new user in', this.form.value);

    let user: any = {};

    user.Email = this.form.get('email').value;
    user.Password = this.form.get('password').value;
    user.FirstName = this.form.get('firstname').value;
    user.LastName = this.form.get('lastname').value;
    user.Phone = this.form.get('phone').value;

    this.auth.register(user)
      .subscribe((res: any) => {
        console.log('register', res);
        this.router.navigate([this.route.snapshot.queryParams.get('redirectUrl')]);
        // window.location.reload();
      },
      error => {
        console.log('error logging in', error);
        //this.alertify.error(error);
      });

    
  }

}
