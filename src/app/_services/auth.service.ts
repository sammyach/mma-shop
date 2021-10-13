import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export class LoginUser {
  User?: string;
  Password?: string;
}

// export class User {   
//   Id?: number; 
//   Username?: string;
//   Email?: string;
//   FirstName?: string;
//   LastName?: string;
//   Phone?: string;
//   Token?: string;
//   Role?: any[];
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  baseUrl = environment.apiUrl;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean>;
  

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getDecodedToken());
    this.currentUser = this.currentUserSubject.asObservable();

    if(this.getDecodedToken()) this.isLoggedInSubject = new BehaviorSubject<boolean>(true);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    console.log('current user in auth service', this.currentUser);
  }

  register(newuser: any){    
    
    return this.http.post(`${this.baseUrl}/api/users/auth/register`, newuser)
        .pipe(map((res: any) => {
          const tkn = res.Token;                   
          const user = this.setSession(tkn);
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          return user;
        }));
  }

  login(user: string, password: string){
    console.log('in auth: loggin in');    
    let data: LoginUser = {};
    //let data: any = {};
    data.User = user;
    data.Password = password;
    
    //return this.http.get<any[]>(`${this.baseUrl}/api/product`);
    //return this.http.post<any>(`${this.baseUrl}/api/users/auth/login`, data);
    return this.http.post(`${this.baseUrl}/api/users/auth/login`, data)
        .pipe(map((res: any) => {
          const tkn = res.Token;
          const user = this.setSession(tkn);
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          return user;
        }));
  }

  logout(){
    // remove user from local storage to log user out
    
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    
    // localStorage.removeItem('token');
    // this.currentUserTokenSubject.next(null);
    this.router.navigate(['']);
    window.location.reload();
  }

  loggedIn(){
    const helper = new JwtHelperService();
    //return this.currentUserValue && this.currentUserValue.Token;
    const token = localStorage.getItem('access_token');
    if(!token) return false;
    //const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(token);  
    console.log('check if expired', isExpired);
     
    if(isExpired){ 
      this.logout();
      return false;
    }
    
    return true;
     //return token; // for now;later we will decode token and check for expiration
  }

  setSession(token: string){
    //localStorage.setItem('access_token', JSON.stringify(token));
    localStorage.setItem('access_token', token);
    const decodedToken = this.getDecodedToken();   
    return decodedToken;
  }

  getDecodedToken(){
    const helper = new JwtHelperService();
    const token = localStorage.getItem('access_token');
    const decodedToken = helper.decodeToken(token);
    return decodedToken;
    // const expirationDate = helper.getTokenExpirationDate(myRawToken);
    // const isExpired = helper.isTokenExpired(myRawToken);
  }
  
}
