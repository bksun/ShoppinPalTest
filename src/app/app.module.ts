import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { SubcategoryCreateComponent } from './category/subcategory-create/subcategory-create.component';
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatTabsModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatSelectModule} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SignupComponent } from './signup/signup.component';
// import { AuthServiceService } from './auth-service.service';
import {  AuthInterceptorService } from './auth-interceptor.service';
import { CategoriesService } from './common/services/categories.service';
import { HomeComponent } from './home/home.component';
import { SubCatsComponent } from './sub-cats/sub-cats.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryCreateComponent,
    SubcategoryCreateComponent,
    CategoryDeleteComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SubCatsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule, MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, CategoriesService],
  bootstrap: [AppComponent]
})

export class AppModule { }
