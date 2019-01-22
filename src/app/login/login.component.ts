import { Component, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authServ: AuthServiceService, private router: Router) { }

  ngOnInit() {
    const isAthenticated = this.authServ.getIsAuthenticated();
    if (isAthenticated) {
      this.router.navigate(['/home']);
    }
  }

  onLogin( loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
     this.authServ.loginUser(loginForm.value.email, loginForm.value.password);
     loginForm.resetForm();
    }

}
