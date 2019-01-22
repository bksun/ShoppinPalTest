import { Component, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(public authServ: AuthServiceService) { }

  ngOnInit() {
  }


  onLogin( loginForm: NgForm) {

    if (loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    console.log('frontend:', loginForm.value);
     this.authServ.loginUser(loginForm.value.email, loginForm.value.password);
     loginForm.resetForm();
    }

}
