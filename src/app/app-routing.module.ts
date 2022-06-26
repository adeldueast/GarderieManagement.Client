import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Layout/Layout.component';
import { LoginComponent } from './Components/Authentification/Login/Login.component';
import { PageNotFoundComponent } from './Components/PageNotFound/PageNotFound.component';
import { RegisterComponent } from './Components/Authentification/Register/Register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SidebarComponent } from './Components/Sidebar/Sidebar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: LayoutComponent, canActivate: [AuthGuard] },

  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },


  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
