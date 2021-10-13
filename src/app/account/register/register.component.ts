import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  passwordsMatch;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cpassword: []
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;
    
    
    if(this.form.valid){
      const password: string = this.form.get('password').value.trim();
      const cpassword: string = this.form.get('cpassword').value.trim();
      console.log('p', password);
      console.log('c', cpassword);
      
      if(password === cpassword){
        console.log('match');
        this.passwordsMatch = true;
      }else{
        this.passwordsMatch = false;
        return;
      }

      let user: any = {};

      user.Email = this.form.get('email').value;
      user.Password = password;
      user.FirstName = this.form.get('firstname').value;
      user.LastName = this.form.get('lastname').value;
      user.Phone = this.form.get('phone').value;

      this.auth.register(user)
        .subscribe((res: any) => {
          console.log('register', res);
          
          let url = this.route.snapshot.queryParams['redirectUrl'];
          
          if(url && url.length > 0){
            this.router.navigate([url[0]]);
          }else{
            this.router.navigate([''])
          }
          // window.location.reload();
        },
        error => {
          console.log('error logging in', error);
          //this.alertify.error(error);
        });
    }

    

    
  }

}
