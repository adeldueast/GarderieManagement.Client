import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Layout/Layout.component';
import { LoginComponent } from './Components/Authentification/Login/Login.component';
import { PageNotFoundComponent } from './Components/PageNotFound/PageNotFound.component';
import { RegisterComponent } from './Components/Authentification/Register/Register.component';
import { AuthGuard } from './shared/guards/auth.guard';

import { ClassroomsComponent } from './Components/Classrooms/Classrooms.component';
import { StaffComponent } from './Components/Staff/Staff.component';
import { ChildrenComponent } from './Components/childrens/children/children.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'children', component: ChildrenComponent ,}, 
      // { path: 'groups', component: GroupsComponent }, 
      { path: 'classrooms', component: ClassroomsComponent },      
      { path: 'staff', component: StaffComponent },       

   ],
  },

  //{ path: '', redirectTo: 'login', pathMatch: 'full' }, // redirect to home
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
