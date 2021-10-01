import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export class LoginUser {
  User?: string;
  Password?: string;
}

export class User {   
  Id?: number; 
  Username?: string;
  Email?: string;
  FirstName?: string;
  LastName?: string;
  Phone?: string;
  Token?: string;
  Role?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('current user in auth service', this.currentUser);
  }

  register(newuser: any){
    console.log('in auth: registering in');
    
    return this.http.post(`${this.baseUrl}/api/users/auth/register`, newuser)
        .pipe(map((res: any) => {
          const usr = res;
          console.log('usr', usr);

          localStorage.setItem('currentUser', JSON.stringify(usr));
          this.currentUserSubject.next(usr);
          return usr;
        }));
  }

  login(user: string, password: string){
    console.log('in auth: loggin in');
    
    let data: LoginUser = {};
    //let data: any = {};
    data.User = user;
    data.Password = password;
    console.log('in auth: loggin in', data);
    //return this.http.get<any[]>(`${this.baseUrl}/api/product`);
    //return this.http.post<any>(`${this.baseUrl}/api/users/auth/login`, data);
    return this.http.post(`${this.baseUrl}/api/users/auth/login`, data)
        .pipe(map((res: any) => {
          const usr = res;
          console.log('usr', usr);

          localStorage.setItem('currentUser', JSON.stringify(usr));
          this.currentUserSubject.next(usr);
          return usr;
        }));
  }

  logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    
    // localStorage.removeItem('token');
    // this.currentUserTokenSubject.next(null);
    this.router.navigate(['']);
    window.location.reload();
  }

  loggedIn(){
    //return this.currentUserValue && this.currentUserValue.Token;
    // const token = localStorage.getItem('token');
    // return token; // for now;later we will decode token and check for expiration
  }
  
}
