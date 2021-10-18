import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted;
  loading = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if(this.form.valid){
      console.log('logging in', this.form.value);
      const user = this.form.get('username').value;
      const password = this.form.get('password').value;

      this.auth.login(user, password)
        .subscribe((res: any) => {
          this.loading = false;
          console.log('login', res);
          let url = this.route.snapshot.queryParams['redirectUrl'];
          console.log('redirect...', url);
          if(url && url.length > 0){
            this.router.navigate([url[0]]);
          }else{
            this.router.navigate([''])
          }

          // window.location.reload();
        },
        error => {
          this.loading = false;
          console.log('error logging in', error);
          //this.alertify.error(error);
        });
    }



  }

}
