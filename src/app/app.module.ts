import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/Authentification/Register/Register.component';
import { LoginComponent } from './Components/Authentification/Login/Login.component';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './Components/Layout/Layout.component';
import { SidebarComponent } from './Components/Sidebar/Sidebar.component';
import { SidebarItemComponent } from './Components/Sidebar-Item/Sidebar-Item.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    SidebarComponent,
    SidebarItemComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44356"],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
