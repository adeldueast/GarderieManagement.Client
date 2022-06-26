import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Layout/Layout.component';
import { LoginComponent } from './Components/Authentification/Login/Login.component';
import { PageNotFoundComponent } from './Components/PageNotFound/PageNotFound.component';
import { RegisterComponent } from './Components/Authentification/Register/Register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Auth2Guard } from './shared/guards/auth2.guard';

const routes: Routes = [
 

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: LayoutComponent , canActivate:[Auth2Guard] },


  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to login
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
