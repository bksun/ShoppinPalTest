import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public authServ: AuthServiceService, private router: Router) { }

  ngOnInit() {
    const isAthenticated = this.authServ.getIsAuthenticated();
    if (isAthenticated) {
      this.router.navigate(['/home']);
    }
  }

  onSignup( signupForm: NgForm) {
    if (signupForm.invalid) {
      return;
    }
      this.authServ.createUser(signupForm.value.email, signupForm.value.password);
      signupForm.resetForm();
    }
}
