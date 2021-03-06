import {Component, OnInit} from '@angular/core';
import {PhoneDetail} from './phoneDetail.model';
import {AppServiceService} from '../app-service.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Organization} from '../organization/organization.model';
import {Country} from '../country/country.model';
import {State} from '../state-info/state.model';
import {City} from '../city/city.model';
import {Location} from '../location/location.model';
import {ApiEndpoints} from '../api-endpoints';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {
  p = 1;
  tPage = null;
  pageItems = 20;

  showTable = true;
  showForm = false;

  RecordsPerPage = [20, 50, 100, 150];
  numberList: PhoneDetail[] = [];
  organizationList: Organization[] = [];
  countryList: Country[] = [];
  stateList: State[] = [];
  selectedState: State[] = [];
  selectedCity: City[] = [];
  cityList: City[] = [];
  streetList: Location[] = [];

  numberForm: FormGroup;
  selectNumber = null;

  constructor(private appService: AppServiceService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.firstFunction();
  }

  onChange(value) {
    this.p = 1;
    this.pageItems = +value;
    this.getNumberDetail();
    // console.log(this.pageItems);
  }

  getNumberDetail() {
    // console.log(this.pageItems);
    // const url = `phoneDetail?pageNumber=${this.p}&recordsPerPage=${this.pageItems}&sortBy=org&sortOrder=asc`;
    this.appService.getAPI(ApiEndpoints.PhoneDetail + `?pageNumber=${this.p}&recordsPerPage=${this.pageItems}&sortBy=org&sortOrder=asc`)
      .subscribe(res => {
        // console.log(res);
        this.tPage = res.pager.totalRecords;
        this.numberList = res.payload.data;
      });
  }

  getOrg() {
    if (this.organizationList.length === 0) {
      // const url = `organization`;
      this.appService.getAPI(ApiEndpoints.Organization)
        .subscribe(res => {
          // console.log(res);
          this.organizationList = res.payload.data;
        });
    }
  }

  getCountry() {
    if (this.countryList.length === 0) {
      // const url = `country`;
      this.appService.getAPI(ApiEndpoints.Country)
        .subscribe(res => {
          // console.log(res);
          this.countryList = res.payload.data;
        });
    }
  }

  getState() {
    if (this.stateList.length === 0) {
      // const url = `state`;
      this.appService.getAPI(ApiEndpoints.State)
        .subscribe(res => {
          // console.log(res);
          this.stateList = res.payload.data;
        });
    }
  }

  onSelectState(value: string) {
    console.log(this.stateList);
    this.selectedState = this.stateList.filter(state => {
      return state.country_id === +value;
    });
    // console.log(this.selectedState);
  }

  getCity() {
    if (this.cityList.length === 0) {
      // const url = `city`;
      this.appService.getAPI(ApiEndpoints.City)
        .subscribe(res => {
          // console.log(res);
          this.cityList = res.payload.data;
        });
    }
  }

  onSelectCity(value: string) {
    this.selectedCity = this.cityList.filter(city => {
      return city.state_id === +value;
    });
    // console.log(this.selectedCity);
  }

  getStreet() {
    if (this.streetList.length === 0) {
      // const url = `location?records=all`;
      this.appService.getAPI(ApiEndpoints.Location + `?records=all`)
        .subscribe(res => {
          console.log(res);
          this.streetList = res.payload.data;
        });
    }
  }

  addNumber(formValue: any) {
    if (this.selectNumber == null) {
      // const url = `phone`;
      this.appService.postAPI(ApiEndpoints.Phone, formValue)
        .subscribe(() => {
            this.getNumberDetail();
            this.selectedState = [];
            this.selectedCity = [];
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      // const url = `phone/${this.selectNumber.phone_id}`;
      this.appService.putAPI(ApiEndpoints.Phone + `/${this.selectNumber.phone_id}`, formValue)
        .subscribe(() => {
            this.getNumberDetail();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
  }

  removeNumber(id: number, index: number): void {
    // const url = `phone/${id}`;
    this.appService.deleteAPI(ApiEndpoints.Phone + `/${id}`)
      .subscribe(() => {
        this.numberList.splice(index, 1);
      });
  }

  initial(numberData: any) {
    this.numberForm = this.fb.group({
      phone_number: [numberData ? numberData.phone_number : ''],
      phone_type_id: [numberData ? numberData.phone_list_id : ''],
      org_id: [numberData ? numberData.org_id : ''],
      country_id: [numberData ? numberData.country_id : ''],
      state_id: [numberData ? numberData.state_id : ''],
      city_id: [numberData ? numberData.city_id : ''],
      street: [numberData ? numberData.street : ''],
      postal_code: [numberData ? numberData.postal_code : ''],
      isCrawl: [numberData ? numberData.isCrawl : ''],
    });
  }

  goPrev() {
    this.selectedState = [];
    this.selectedCity = [];
    this.showForm = false;
    this.showTable = true;
  }

  showProperty(numberData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(numberData);
    this.selectNumber = numberData;
  }

  firstFunction() {
    this.getOrg();
    this.getState();
    this.getCity();
    this.getCountry();
    this.getStreet();
    this.getNumberDetail();
  }
}
