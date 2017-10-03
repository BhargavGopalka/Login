import {Component, OnInit} from '@angular/core';
import {City} from './city.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppServiceService} from '../app-service.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cityList: City[] = [];
  stateList = [];

  showTable = true;
  showForm = false;

  cityForm: FormGroup;
  selectCity = null;

  constructor(private fb: FormBuilder, private appService: AppServiceService) {
  }

  ngOnInit() {
    this.getCity();
  }

  removeCity(id: number, index: number): void {
    const url = `city/${id}`;
    this.appService.deleteAPI(url)
      .subscribe(res => {
        this.cityList.splice(index, 1);
        console.log(res);
      });
  }

  getCity(): void {
    const url = `city`;
    this.appService.getAPI(url).subscribe(res => {
      console.log(res);
      this.cityList = res.payload.data;
    });
  }

  addCity(formValue: any) {
    if (this.selectCity == null) {
      const url = `city`;
      this.appService.postAPI(url, formValue)
        .subscribe(res => {
            console.log(res);
            this.getCity();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      const anotherUrl = `city/${this.selectCity.id}`;
      this.appService.putAPI(anotherUrl, formValue)
        .subscribe(res => {
            console.log(res);
            this.getCity();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
  }

  getState() {
    const url = `state`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
        this.stateList = res.payload.data;
      });
  }

  initial(cityData: any) {
    this.cityForm = this.fb.group({
      state_id: [cityData ? cityData.state_id : ''],
      city: [cityData ? cityData.name : ''],
      code: [cityData ? cityData.code : '']
    });
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

  showProperty(cityData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(cityData);
    this.selectCity = cityData;
    this.getState();
  }
}
