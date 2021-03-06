import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './signup/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string = localStorage.getItem('user') || '';
  private AuthStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userEmail: string = localStorage.getItem('userEmail') || '';
  private apiUrl = 'https://bksun.herokuapp.com/api/';

  constructor( public http: HttpClient, private router: Router) { }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    localStorage.setItem('user', this.token);
    this.AuthStatusListener.next(false);
    this.router.navigate(['/home']);
  }

  refreshLogin() {
      this.isAuthenticated = true;
      this.AuthStatusListener.next(true);
      this.router.navigate(['/home']);
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    this.isAuthenticated = this.getToken()? true : false;
    return this.isAuthenticated;
  }

  getUserEmail() {
    return this.userEmail;
  }
  getAuthStatusListener() {
    return this.AuthStatusListener.asObservable();
  }

  createUser( email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.apiUrl + 'Users', authData)
    .subscribe(result => {
      alert('User created successfully');
    },
    (error) => this.handleError(error),
  );
  }

  loginUser( email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{id: string, userId: number}> (this.apiUrl + 'Users/login', authData)
    .subscribe(result => {
      if(!result || !result.id){
        alert("Please enter correct email and password.");
        return;
      }
      const tempToken = result.id;
      this.token = tempToken;
      localStorage.setItem('user', this.token);
      this.getUserEmailService(result.userId);
      if (this.token) {
        this.isAuthenticated = true;
        this.AuthStatusListener.next(true);
        this.router.navigate(['/home']);
      }
      const user  = localStorage.getItem('user');
        if(user !== 'undefined') {
          this.isAuthenticated = true;
          this.AuthStatusListener.next(true);
          this.router.navigate(['/home']);
        }
    },
    (error) => this.handleError(error),
  );
  }


  getUserEmailService(userId: number) {
    this.http.get<{ email: string}>
    (this.apiUrl + 'users/' + userId + '?access_token=' + this.token)
    .subscribe(( response) => {
      this.userEmail = response.email;
      localStorage.setItem('userEmail', this.userEmail);
    },
    (error) => this.handleError(error),
  );
  }
  handleError(error: any) {
    if (error.error.error.message) {
      let errorMsg: string = 'Error: ';
      errorMsg += error.error.error.message;
      alert(errorMsg)
    };
  }
}
