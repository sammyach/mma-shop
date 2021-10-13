import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedIn = this.authService.loggedIn();
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const token = localStorage.getItem('access_token');
    console.log('token', token);

    let uuid = sessionStorage.getItem('uuid');
    uuid = uuid ? uuid : ""; //session so we lose it when user ends the session or close tab
    console.log('in jwt: loggin uuid', uuid);
        
    if(isApiUrl){      
      request = request.clone({
        setHeaders: {
            Authorization: loggedIn ? `Bearer ${token}` : "",
            'x-uuid' : uuid
        }
      });
    } 

    return next.handle(request);
  }
}
