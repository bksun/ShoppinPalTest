import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../common/services/categories.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  @Input() category: any;

  isEdit: Boolean = false;
  data = {
    id: 0,
    name: '',
    type: '',
    description: ''
  };

  constructor(private catserv: CategoriesService, private router: Router,  private activatedRoute: ActivatedRoute, private authServ: AuthServiceService) { }

  ngOnInit() {
    const isAthenticated = this.authServ.getIsAuthenticated();
    if (!isAthenticated) {
      this.router.navigate(['/login']);
    }
    let params: any = this.activatedRoute.snapshot.queryParams;
    if(params['id']) {
      this.isEdit = true;
      this.data['id'] = params['id'];
      this.data['name'] = params['name'];
      this.data['type'] = params['type'];
      this.data['description'] = params['description'];
    } else{

      this.data = { id: 0,    name: '',     type: '',     description: ''   };
    }
  }

  createCategory( form: NgForm) {
    if (form.invalid) {
      return;

    }
    if (!this.isEdit) {
      this.catserv.createCategory(form.value.name, form.value.description, form.value.type);
    } else
    {
      this.catserv.editCategory(form.value.name, form.value.description, form.value.type, this.data.id);
    }
      form.resetForm();
      this.router.navigate(['/home']);
    }

}
