import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private Auth: AuthServiceService ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    alert('interceptor working...');
    const authToken = this.Auth.getToken();
    console.log('new token', authToken);
    console.log('----->', authToken);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    console.log('interceptor token', authRequest.headers);
    return next.handle(authRequest);
  }
}
