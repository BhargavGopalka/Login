import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppServiceService} from '../app-service.service';
import {State} from './state.model';

@Component({
  selector: 'app-state-info',
  templateUrl: './state-info.component.html',
  styleUrls: ['./state-info.component.css']
})

export class StateInfoComponent implements OnInit {

  stateList: State[] = [];
  countries = [];

  showTable = true;
  showForm = false;

  stateForm: FormGroup;
  selectState = null;

  constructor(private fb: FormBuilder, private appService: AppServiceService) {
  }

  ngOnInit() {
    this.getState();
  }

  removeState(id: number, index: number): void {
    const url = `state/${id}`;
    this.appService.deleteAPI(url)
      .subscribe(res => {
        this.stateList.splice(index, 1);
        console.log(res);
      });
  }

  getState(): void {
    const url = `state`;
    this.appService.getAPI(url).subscribe(res => {
      console.log(res);
      this.stateList = res.payload.data;
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

  searchState(value: string) {
    const searchName = {'state': value};
    const url = `state?records=all&sortBy=state&sortOrder=asc&search=${JSON.stringify(searchName)}`;
    this.appService.getAPI(url)
      .subscribe(res => {
        this.stateList = res.payload.data;
        // console.log(this.stateList);
      });
  }

  addState(formValue: any) {
    //
    // const header = new Headers();
    // header.append('Authorization', sessionStorage.getItem('currentUser'));
    //
    // const option = new RequestOptions();
    // option.headers = header;
    //
    if (this.selectState == null) {
      const url = `state`;
      this.appService.postAPI(url, formValue)
        .subscribe(res => {
            console.log(res);
            this.getState();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      const anotherUrl = `state/${this.selectState.id}`;
      this.appService.putAPI(anotherUrl, formValue)
        .subscribe(res => {
            console.log(res);
            this.getState();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
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

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

  showProperty(stateData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(stateData);
    this.selectState = stateData;
    this.getCountries();
  }

}
