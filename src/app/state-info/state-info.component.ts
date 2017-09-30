import { Component, OnInit } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-state-info',
  templateUrl: './state-info.component.html',
  styleUrls: ['./state-info.component.css']
})
export class StateInfoComponent implements OnInit {

  details = [];
  countries = [];

  showTable = true;
  showForm = false;

  stateForm: FormGroup;
  selectState = null;

  constructor( private http: Http, private fb: FormBuilder, private appService: AppServiceService) {}

  ngOnInit() {
    this.getState();
  }

  removeState( id: number, index: number): void {
    const url = `state/${id}`;
    this.appService.deleteAPI(url)
      .subscribe( res => {
        this.details.splice( index, 1);
        console.log(res);
      });
  }

  getState(): void {
    const url = `state`;
    this.appService.getAPI(url).subscribe(res => {
    console.log(res);
    this.details = res.payload.data;
  });
    // const header = new Headers();
    // header.append('Authorization', sessionStorage.getItem('currentUser'));
    //
    // const option = new RequestOptions();
    // option.headers = header;
    //
    // const url = `https://mvp-dev-extensionsapi.visumenu.com/state`;
    // this.http.get(url, option)
    //   .subscribe(res => {
    //     console.log(res.json());
    //     this.details = res.json().payload.data;
    //   });
  }

  addState(formValue: any) {
    //
    // const header = new Headers();
    // header.append('Authorization', sessionStorage.getItem('currentUser'));
    //
    // const option = new RequestOptions();
    // option.headers = header;
    //
    const url = `state`;
    const anotherUrl = `state/${this.selectState.id}`;
    if (this.selectState == null) {
    this.appService.postAPI(url, formValue)
      .subscribe(res => {
          console.log(res);
        },
        msg => {
        console.log(`Error: ${msg.status} ${msg.statusText}`);
        });
    } else {
      this.appService.putAPI(anotherUrl, formValue)
        .subscribe(res => {
            console.log(res);
            this.getState();
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
    this.getState();
    this.showTable = true;
    this.showForm = false;
  }

  getCountries() {

    const url = `country`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
        this.countries = res.payload.data;
      });
  }


  // removeState( id: number, index: number) {
  //
  //   const header = new Headers();
  //   header.append('Authorization', sessionStorage.getItem('currentUser'));
  //
  //   const option = new RequestOptions();
  //   option.headers = header;
  //
  //   const url = `https://mvp-dev-extensionsapi.visumenu.com/state/${id}`;
  //   this.http.delete( url, option)
  //     .subscribe( () => {
  //       this.details.splice( index, 1);
  //     });
  // }

  initial(stateData: any) {
    this.stateForm = this.fb.group({
      country_id: [stateData ? stateData.country_id : ''],
      state: [stateData ? stateData.state : ''],
      code: [stateData ? stateData.code : '']
    });
  }

  showProperty(stateData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(stateData);
    this.selectState = stateData;
    this.getCountries();
  }

}
