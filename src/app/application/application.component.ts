import {Component, OnInit} from '@angular/core';
import {Application} from './application.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppServiceService} from '../app-service.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  appList: Application[] = [];

  appForm: FormGroup;
  selectApp = null;

  tableShow = true;
  formShow = false;

  constructor(private fb: FormBuilder, private appService: AppServiceService) {
  }

  ngOnInit() {
    this.getApp();
  }

  getApp() {
    const url = `app?records=all`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
        this.appList = res.payload.data;
      });
  }

  addApp(formVal: any) {
    const url = `app`;
    if (this.selectApp == null) {
      this.appService.postAPI(url, formVal)
        .subscribe(res => {
            console.log(res);
            this.getApp();
            this.tableShow = true;
            this.formShow = false;
          },
          msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
    } else {
      this.appService.putAPI(url + '/' + this.selectApp.id, formVal)
        .subscribe(res => {
            console.log(res);
            this.getApp();
            this.tableShow = true;
            this.formShow = false;
          },
          msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
    }
  }

  removeApp(id: number, index: number) {
    const url = `app/${id}`;
    this.appService.deleteAPI(url)
      .subscribe(res => {
        this.appList.splice(index, 1);
        console.log(res);
        this.getApp();
      });
  }

  initialForm(appData: any) {
    this.appForm = this.fb.group({
      url: [appData ? appData.url : ''],
      description: [appData ? appData.description : '']
    });
  }


  showForm(appData: any) {
    this.selectApp = appData;
    this.tableShow = false;
    this.formShow = true;
    this.initialForm(appData);
  }

  goPrev() {
    this.formShow = false;
    this.tableShow = true;
  }
}