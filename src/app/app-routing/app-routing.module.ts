import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoTableComponent} from '../info-table/info-table.component';
import {LoginUserComponent} from '../login-user/login-user.component';
import {OrganizationComponent} from '../organization/organization.component';
import {CountryComponent} from '../country/country.component';
import {StateInfoComponent} from '../state-info/state-info.component';
import {DepartmentComponent} from '../department/department.component';
import {CityComponent} from "../city/city.component";
import {LocationComponent} from "../location/location.component";
import {ApplicationComponent} from "../application/application.component";

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
    path: 'department',
    component: DepartmentComponent
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
    path: 'city',
    component: CityComponent
  },
  {
    path: 'infoTable/city',
    component: CityComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'infoTable/location',
    component: LocationComponent
  },
  {
    path: 'infoTable/department',
    component: DepartmentComponent
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
    path: 'application',
    component: ApplicationComponent
  },
  {
    path: 'infoTable/application',
    component: ApplicationComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
