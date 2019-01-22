import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private Auth: AuthServiceService ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    const authToken = this.Auth.getToken();
    const authRequest = req.clone({
      params: req.params.set('accessTokens?access_token', '' + authToken)
    });

    this.tokenAccess();

    return next.handle(authRequest);
  }

  tokenAccess() {
    const user  = localStorage.getItem('user');
    if(user !== 'undefined') {
      const user  = localStorage.getItem('user');
    }
  }
}
