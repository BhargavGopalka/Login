import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  details = [];
  tableShow = true;
  formShow = false;
  countryForm: FormGroup;
  selectCountry = null;

  constructor( private http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));

    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/country?pageNumber=1&recordsPerPage=20`;
    this.http.get(url, option)
      .subscribe( res => {
        this.details = res.json().payload.data;
        console.log(this.details);
      });
  }

  addCountry(formVal: any) {

    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));

    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/country`;
    if (this.selectCountry == null) {
    this.http.post(url, formVal, option)
      .subscribe( res => {
        console.log(res.json());
        // this.details.push(res.json().payload.data);
        // console.log(this.details);
        // this.http.get(url, option)
        //   .subscribe( respon => {this.details.push(respon.json());
        //   console.log(this.details); });
        },
        msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
    } else {
      this.http.put(url + '/' + this.selectCountry.id, formVal, option)
        .subscribe(res => {
          console.log(res.json());
          this.getData();
        });
    }
    this.getData();
    this.tableShow = true;
    this.formShow = false;
  }

  doRemove(id: number, index: number) {

    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));

    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/country/${id}`;
    this.http.delete(url, option)
      .subscribe(res => {
        this.details.splice(index, 1);
        console.log(res.json());
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
