import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { CategoriesService } from '../../common/services/categories.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'subcategory-create-create',
  templateUrl: './subcategory-create.component.html',
  styleUrls: ['./subcategory-create.component.css']
})
export class SubcategoryCreateComponent implements OnInit {
  categories: any = [];
  constructor( private catserv: CategoriesService, private router: Router, private authServ: AuthServiceService) { }

  ngOnInit() {
    const isAthenticated = this.authServ.getIsAuthenticated();
    if (!isAthenticated) {
      this.router.navigate(['/login']);
    }
    this.catserv.getCategories();
    let catsSub: any = this.catserv.getCatsUpdateListener()
    .subscribe((cats) => {
        this.categories = cats[0];
    });
  }

  createSubCategory( form: NgForm) {
    if (form.invalid) {
      return;
    }
      this.catserv.createSubCategory(form.value.name, form.value.description, form.value.type, form.value.parenttype, form.value.categoryId);
      form.resetForm();
    }

}
