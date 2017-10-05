import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Country} from './country.model';
import {AppServiceService} from '../app-service.service';
import {Headers, Http, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryList: Country[] = [];

  tableShow = true;
  formShow = false;

  countryForm: FormGroup;
  selectCountry = null;

  constructor(private fb: FormBuilder, private  appService: AppServiceService, private http: Http) {
  }

  ngOnInit() {
    this.getCountry();
  }

  getCountry() {

    const url = `country?pageNumber=1&recordsPerPage=20`;
    this.appService.getAPI(url)
      .subscribe(res => {
        this.countryList = res.payload.data;
      });
  }

  searchCountry(value: string) {
    const searchName = {'country': value};
    const header = new Headers();
    header.append('search', JSON.stringify(searchName));
    header.append('Authorization', sessionStorage.getItem('currentUser'))
    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/country?pageNumber=1&recordsPerPage=20&sortBy=country&sortOrder=asc`;
    // this.appService.getAPI(url,option)
    this.http.get(url, option)
      .subscribe(res => {
        this.countryList = res.json().payload.data;
        // console.log(this.countryList);
      });
  }

  addCountry(formVal: any) {

    const url = `country`;
    if (this.selectCountry == null) {
      this.appService.postAPI(url, formVal)
        .subscribe(() => {
            this.getCountry();
            this.tableShow = true;
            this.formShow = false;
            // this.details.push(res.json().payload.data);
            // console.log(this.details);
            // this.http.get(url, option)
            //   .subscribe( respon => {this.details.push(respon.json());
            //   console.log(this.details); });
          },
          msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
    } else {
      this.appService.putAPI(url + '/' + this.selectCountry.id, formVal)
        .subscribe(res => {
          console.log(res);
          this.getCountry();
          this.tableShow = true;
          this.formShow = false;
        });
    }
  }

  removeCountry(id: number, index: number) {

    const url = `country/${id}`;
    this.appService.deleteAPI(url)
      .subscribe(res => {
        this.countryList.splice(index, 1);
        console.log(res);
      });
  }

  initial(countryData: any) {
    this.countryForm = this.fb.group({
      country: [countryData ? countryData.country : ''],
      code: [countryData ? countryData.code : ''],
      dialing_code: [countryData ? countryData.dialing_code : '']
    });
  }

  showForm(countryData: any) {
    this.tableShow = false;
    this.formShow = true;
    this.initial(countryData);
    this.selectCountry = countryData;
  }

  goPrev() {
    this.formShow = false;
    this.tableShow = true;
  }
}
