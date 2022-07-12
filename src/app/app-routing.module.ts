import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/Layout/Layout.component';
import { LoginComponent } from './Components/Authentification/Login/Login.component';
import { PageNotFoundComponent } from './Components/PageNotFound/PageNotFound.component';
import { RegisterComponent } from './Components/Authentification/Register/Register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Title } from '@angular/platform-browser';
import { ClassroomsComponent } from './Components/Classrooms/Classrooms.component';
import { StaffComponent } from './Components/Staff/Staff.component';
import { ChildrenComponent } from './Components/childrens/children/children.component';
import { ChildComponent } from './Components/childrens/child/child.component';
import { GroupsComponent } from './Components/groups/groups.component';

const routes: Routes = [
  // Login page  http://localhost:4200/login
  { path: 'login', component: LoginComponent },

  // Register page  http://localhost:4200/register
  { path: 'register', component: RegisterComponent },

  // Home page  http://localhost:4200
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Children page  http://localhost:4200/children
      {
        path: 'children',
        component: ChildrenComponent,
        canActivate: [AuthGuard],
      },  
      {
        // Child page  http://localhost:4200/children/1
        path: 'children/:id',
        component: ChildComponent,
        canActivate: [AuthGuard],
      },
      {
        // Groups page  http://localhost:4200/groups
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard],
      },
      // Staff page  http://localhost:4200/Staff
      { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
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
