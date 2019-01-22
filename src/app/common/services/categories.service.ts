import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  categories: any[] =  [];
  subCategories: any[] =  [];
  private catsUpdated = new Subject();
  private subCatsUpdated = new Subject();
  private token = localStorage.getItem('user');

  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get<{ category: any}>('https://bksun.herokuapp.com/api/Categories')
    .subscribe(( response) => {
      this.categories = [response];
      this.catsUpdated.next([...this.categories]);
    });
  }

  getSubCategories(subcats: any) {
    this.http.get<{ category: any}>
    ('https://bksun.herokuapp.com/api/categories/' + subcats + '/subcategories')
    .subscribe(( response) => {
      this.subCategories = [response];
      this.subCatsUpdated.next([...this.subCategories]);
    });
  }

  createCategory( name: string, description: string, type: string) {
    const data = {   name: name,   description: description,   type: type};
    this.http.post('https://bksun.herokuapp.com/api/Categories'+ '?access_token=' + this.token, data)
    .subscribe(result => {
      alert('Category created successfully');
    });
  }

  createSubCategory( name: string, description: string, type: string, parenttype: string, categoryId: number) {
    const data = {   name: name,   description: description,   type: type, categoryId: categoryId};
    this.http.post('https://bksun.herokuapp.com/api/Subcategories'+ '?access_token=' + this.token, data)
    .subscribe(result => {
      alert('Sub-category created successfully');
    });
  }

  deleteCategory(categoryId: number) {
    this.http.delete('https://bksun.herokuapp.com/api/Categories/'+ categoryId +'?access_token=' + this.token)
    .subscribe(result => {
      alert('Category deleted successfully');
    });
  }
  editCategory( name: string, description: string, type: string, id: number) {
    const data = {   name: name,   description: description,   type: type};
    this.http.put('https://bksun.herokuapp.com/api/Categories/'+ id + '?access_token=' + this.token, data)
    .subscribe(result => {
      alert('Category updated successfully');
    });
  }

  getCatsUpdateListener() {
    return this.catsUpdated.asObservable();
  }

  getSubCatsUpdateListener() {
    return this.subCatsUpdated.asObservable();
  }

}
