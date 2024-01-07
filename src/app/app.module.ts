import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FBloginComponent } from './components/fblogin/fblogin.component';
import { FormsModule } from '@angular/forms';
import { SupersetComponent } from './components/superset/superset.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { InstaLoginComponent } from './components/insta-login/insta-login.component';
import { LinkedInLoginComponent } from './components/linked-in-login/linked-in-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FBloginComponent,
    SupersetComponent,
    NavbarComponent,
    InstaLoginComponent,
    LinkedInLoginComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
