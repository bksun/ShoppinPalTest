import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthServiceService } from '../../auth-service.service';
import { CategoriesService } from '../../common/services/categories.service';

@Component({
  selector: 'category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})

export class CategoryDeleteComponent implements OnInit {
  @Input() categoryId: any;
  @Input() category: any;

  userIsAuthenticated = false;
  constructor(private authServ: AuthServiceService, private catserv: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authServ.getIsAuthenticated();
  }
  getUserIsAuthenticated(){
    this.userIsAuthenticated = this.authServ.getIsAuthenticated();
    return this.userIsAuthenticated;
  }

  deleteCategory() {
    this.catserv.deleteCategory(this.categoryId);
    this.router.navigate(['/home']);
  }
  editCategory() {
    this.router.navigate(['/create'], { queryParams: this.category });
  }
}
