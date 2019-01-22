import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  userIsAuthenticated: boolean = false;
  userEmail: string = ''
  private authListenerSubs: Subscription;

  constructor(private authServ: AuthServiceService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authServ.getIsAuthenticated();
    this.userEmail =  this.authServ.getUserEmail();
  }
  getUserIsAuthenticated(){
    this.userIsAuthenticated = this.authServ.getIsAuthenticated();
    return this.userIsAuthenticated;
  }

  onLogout() {
    this.userIsAuthenticated = false;
    this.authServ.logout();
  }

}
