import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from '../category/category-create/category-create.component';
import { SubcategoryCreateComponent } from '../category/subcategory-create/subcategory-create.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from '../home/home.component';
import { AuthServiceService } from '../auth-service.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create', component: CategoryCreateComponent},
  { path: 'subcategory/create', component: SubcategoryCreateComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthServiceService]
})


export class AppRoutingModule { }
