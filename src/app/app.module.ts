import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/Authentification/Register/Register.component';
import { LoginComponent } from './Components/Authentification/Login/Login.component';
import { LayoutComponent } from './Components/Layout/Layout.component';
import { SidebarComponent } from './Components/Sidebar/Sidebar.component';
import { ChildrenComponent } from './Components/childrens/children/children.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalChildCreateComponent } from './Components/modals/modal-child-create/modal-child-create.component';
import { ClassroomsComponent } from './Components/Classrooms/Classrooms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ChildComponent } from './Components/childrens/child/child.component';
import { ModalGuardianCreateComponent } from './Components/modals/modal-guardian-create/modal-guardian-create.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChildInformationTabComponent } from './Components/childrens/child/tabs/child-information-tab/child-information-tab.component';
import { ChildCalendarTabComponent } from './Components/childrens/child/tabs/child-calendar-tab/child-calendar-tab.component';
import { ChildGuardiansTabComponent } from './Components/childrens/child/tabs/child-guardians-tab/child-guardians-tab.component';
import {MatListModule} from '@angular/material/list';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const Material_Modules = [
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatListModule
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SidebarComponent,
    LayoutComponent,
    ChildrenComponent,
    ChildComponent,
    ModalChildCreateComponent,
    ClassroomsComponent,
    ModalGuardianCreateComponent,
    ChildInformationTabComponent,
    ChildCalendarTabComponent,
    ChildGuardiansTabComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Material_Modules,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44356'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
