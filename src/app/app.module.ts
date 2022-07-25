import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
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
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalChildCreateComponent } from './Components/modals/modal-child-create/modal-child-create.component';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { GroupsComponent } from './Components/groups/groups.component';
import { ModalGroupCreateComponent } from './Components/modals/modal-group-create/modal-group-create.component';
import { ModalStaffCreateComponent } from './Components/modals/modal-staff-create/modal-staff-create.component';
import { StaffComponent } from './Components/Staff/Staff.component';
import {MatCardModule} from '@angular/material/card';
import { ModalActionComponent } from './Components/modals/modal-action/modal-action.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import rrulePlugin from '@fullcalendar/rrule'
import { ModalJournalComponent } from './Components/modals/modal-journal/modal-journal.component';
import { StarRatingComponent } from './Components/modals/star-rating/star-rating.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ModalGroupedChildrenComponent } from './Components/modals/modal-grouped-children/modal-grouped-children.component';
import { GroupComponent } from './Components/group/group.component';
import { ModalDeleteComponent } from './Components/modals/modal-delete/modal-delete.component';
import { ModalNotificationsComponent } from './Components/modals/modal-notifications/modal-notifications.component';
import { DateAsAgoPipe } from './shared/services/pipes/dateAsAgo.pipe';
import { CommonModule } from '@angular/common';
import { ModalImagePreviewComponent } from './Components/modals/modal-image-preview/modal-image-preview.component';
import { PicturePipe } from './shared/services/pipes/picture.pipe';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  rrulePlugin
]);


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
  MatListModule,
  MatTooltipModule,
  MatCheckboxModule ,MatSelectModule,MatCardModule,
  MatStepperModule
  
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
    ModalGuardianCreateComponent,
    ChildInformationTabComponent,
    ChildCalendarTabComponent,
    ChildGuardiansTabComponent,
    GroupsComponent,
    ModalGroupCreateComponent,
    ModalStaffCreateComponent,
    StaffComponent,
    ModalActionComponent,
    ModalJournalComponent,
    StarRatingComponent,
    ModalGroupedChildrenComponent,
    GroupComponent,
    ModalDeleteComponent,
    ModalNotificationsComponent,
    DateAsAgoPipe,
    ModalImagePreviewComponent,
    PicturePipe
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMatColorPickerModule,
    Material_Modules,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44356'],
        disallowedRoutes: [],
      },
    }),
    FullCalendarModule,
    CommonModule
    
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
