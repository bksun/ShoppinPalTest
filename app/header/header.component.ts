import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authServ: AuthServiceService) { }

  ngOnInit() {
    this.userIsAuthenticated  = this.authServ.getIsAuthenticated();
    // this.authListenerSubs = this.authServ.getAuthStatusListener().subscribe(isAuthenticated => {
    //   this.userIsAuthenticated = isAuthenticated;
    // });
  }

  ngOnDestroy() {
    // this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authServ.logout();
  }

}
