import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoTableComponent } from './info-table/info-table.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { OrganizationComponent } from './organization/organization.component';
import { CountryComponent } from './country/country.component';
import { StateInfoComponent } from './state-info/state-info.component';
import {AppServiceService} from "./app-service.service";

@NgModule({
  declarations: [
    AppComponent,
    InfoTableComponent,
    LoginUserComponent,
    OrganizationComponent,
    CountryComponent,
    StateInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ AppServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
