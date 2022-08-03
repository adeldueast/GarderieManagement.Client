import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './Components/pagenotfound/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { StaffComponent } from './Components/staff/staff.component';
import { ChildrenComponent } from './Components/childrens/children/children.component';
import { ChildComponent } from './Components/childrens/child/child.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { GroupComponent } from './Components/group/group.component';
import { PhotosComponent } from './Components/photos/photos.component';
import { CreateGarderieComponent } from './Components/create-garderie/create-garderie.component';
import { LoginComponent } from './Components/Authentification/login/login.component';
import { RegisterComponent } from './Components/Authentification/register/register.component';
import { LayoutComponent } from './Components/layout/layout.component';

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
      {
        // Groups page  http://localhost:4200/groups/1
        path: 'groups/:id',
        component: GroupComponent,
        canActivate: [AuthGuard],
      },
      {
        // Photos page  http://localhost:4200/photos
        path: 'photos',
        component: PhotosComponent,
        canActivate: [AuthGuard],
      },
      // Staff page  http://localhost:4200/Staff
      { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'garderie',
    component: CreateGarderieComponent,
    canActivate: [AuthGuard],
  },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }, // redirect to home
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
