import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../common/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] =  [];
  subCategories: any[] =  [];
  catsSub: Subscription;
  subCatsSub: Subscription;
  categoryIdSub: Subscription;

  constructor( private catserv: CategoriesService) { }


  ngOnInit() {
    this.catserv.getCategories();
    this.catsSub = this.catserv.getCatsUpdateListener()
    .subscribe((cats) => {
        this.categories = [cats[0]];
    });

    this.catserv.getSubCategories(1);
    this.catsSub = this.catserv.getSubCatsUpdateListener()
    .subscribe((cats) => {
        this.subCategories = [cats[0]];
    });
  }

  indexChange(evt: any) {
    const categoryId: number = this.categories[0][evt].id;
    this.catserv.getSubCategories(categoryId);
    this.catsSub = this.catserv.getSubCatsUpdateListener()
    .subscribe((cats) => {
        this.subCategories = [cats[0]];
    });

  }

}
