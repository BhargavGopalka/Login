import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoTableComponent } from '../info-table/info-table.component';
import { LoginUserComponent } from '../login-user/login-user.component';
import { OrganizationComponent } from '../organization/organization.component';
import { CountryComponent } from '../country/country.component';
import { StateInfoComponent } from '../state-info/state-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: 'infoTable',
    component: InfoTableComponent
  },
  {
    path: 'organization',
    component: OrganizationComponent
  },
  {
    path: 'infoTable/organization',
    component: OrganizationComponent
  },
  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: 'infoTable/country',
    component: CountryComponent
  },
  {
    path: 'state',
    component: StateInfoComponent
  },
  {
    path: 'infoTable/state',
    component: StateInfoComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
