import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  categories: any[] =  [];
  subCategories: any[] =  [];
  apiUrl = 'https://bksun.herokuapp.com/api/';
  private catsUpdated = new Subject();
  private subCatsUpdated = new Subject();
  private token = localStorage.getItem('user');

  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get<{ category: any}>(this.apiUrl + 'Categories')
    .subscribe(( response) => {
      this.categories = [response];
      this.catsUpdated.next([...this.categories]);
    },
    (error) => this.handleError(error),
  );
  }

  getSubCategories(subcats: any) {
    this.http.get<{ category: any}>
    (this.apiUrl + 'categories/' + subcats + '/subcategories')
    .subscribe(( response) => {
      this.subCategories = [response];
      this.subCatsUpdated.next([...this.subCategories]);
    },
    (error) => this.handleError(error),
  );
  }

  createCategory( name: string, description: string, type: string) {
    const data = {   name: name,   description: description,   type: type};
    this.http.post(this.apiUrl + 'Categories'+ '?access_token=' + this.token, data)
    .subscribe(result => {
      this.getCategories();
      alert('Category created successfully');
    },
    (error) => this.handleError(error),
  );
  }

  createSubCategory( name: string, description: string, type: string, parenttype: string, categoryId: number) {
    const data = {   name: name,   description: description,   type: type, categoryId: categoryId};
    this.http.post(this.apiUrl + 'Subcategories'+ '?access_token=' + this.token, data)
    .subscribe(result => {
      alert('Sub-category created successfully');
    },
    (error) => this.handleError(error),
  );
  }

  deleteCategory(categoryId: number) {
    this.http.delete(this.apiUrl + 'Categories/'+ categoryId +'?access_token=' + this.token)
    .subscribe(result => {
      this.getCategories();
      alert('Category deleted successfully');
    },
    (error) => this.handleError(error),
  );
  }
  editCategory( name: string, description: string, type: string, id: number) {
    const data = {   name: name,   description: description,   type: type};
    this.http.put(this.apiUrl + 'Categories/'+ id + '?access_token=' + this.token, data)
    .subscribe(result => {
      this.getCategories();
      alert('Category updated successfully');
    },
    (error) => this.handleError(error),
  );
  }

  getCatsUpdateListener() {
    return this.catsUpdated.asObservable();
  }

  getSubCatsUpdateListener() {
    return this.subCatsUpdated.asObservable();
  }
  handleError(error: any) {
    if (error.error.error.message) {
      let errorMsg: string = 'Error: ';
      errorMsg += error.error.error.message;
      alert(errorMsg)
    };
  }
}
