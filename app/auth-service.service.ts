import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './signup/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string = localStorage.getItem('token');
  private AuthStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private apiUrl =  'https://bksun.herokuapp.com/api';
  constructor( public http: HttpClient, private router: Router) { }

  logout() {
    this.token = null;
    localStorage.setItem('token', this.token);
    this.isAuthenticated = false;
    this.AuthStatusListener.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    this.isAuthenticated = this.getToken()? true : false;
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.AuthStatusListener.asObservable();
  }

  createUser( email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.apiUrl + '/Users', authData)
    .subscribe(result => {
      console.log('api result', result);
    });
  }

  loginUser( email: string, password: string) {
    console.log('log in data called');
    const authData: AuthData = { email: email, password: password };
    this.http.post<{id: string}> (this.apiUrl + '/Users/login', authData)
    .subscribe(result => {
      console.log('api login result', result.id);
      debugger;
      const tempToken = result.id;
      this.token = tempToken;
      localStorage.setItem('token', this.token);
      if (this.token) {
        this.isAuthenticated = true;
        this.AuthStatusListener.next(true);
        this.router.navigate(['/']);
      }
    });
  }
}
