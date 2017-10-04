import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppServiceService} from '../app-service.service';
import {Organization} from './organization.model';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  Organization: Organization[] = [];

  dataForm: FormGroup;
  selectedOrg = null;

  tableShow = true;
  formShow = false;

  constructor(private fb: FormBuilder, private appService: AppServiceService) {
  }

  ngOnInit() {
    this.getOrg();
  }

  getOrg() {
    const url = `organization?pageNumber=1&recordsPerPage=20`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
        this.Organization = res.payload.data;
        // console.log(this.details);
      });
  }

  addOrg(formVal: any) {
    // this.dataForm = this.fb.group({
    //   name: ['formVal']
    // });

    const url = `organization`;
    if (this.selectedOrg == null) {
      this.appService.postAPI(url, formVal)
        .subscribe(res => {
            console.log(res);
            this.getOrg();
            this.tableShow = true;
            this.formShow = false;
          },
          msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
    } else {
      this.appService.putAPI(url + '/' + this.selectedOrg.id, formVal)
        .subscribe(res => {
            console.log(res);
            // this.details.push(res.json().payload.data);
            // console.log(this.details);
            this.getOrg();
            this.tableShow = true;
            this.formShow = false;
          },
          msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
    }
  }

  // doEdit(id: number, formVal: any) {
  //
  //   this.addShow = true;
  //   this.show = false;
  //
  //   const header = new Headers();
  //   header.append('Authorization', sessionStorage.getItem('currentUser'));
  //
  //   const option = new RequestOptions();
  //   option.headers = header;
  //
  //   const url = `https://mvp-dev-extensionsapi.visumenu.com/organization/${id}`;
  //   this.http.put(url, formVal, option)
  //     .subscribe(res => {
  //         console.log(res.json());
  //         // this.details.push(res.json().payload.data);
  //         // console.log(this.details);
  //       },
  //       msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
  // }

  removeOrg(id: number, index: number) {
    const url = `organization/${id}`;
    this.appService.deleteAPI(url)
      .subscribe(res => {
        this.Organization.splice(index, 1);
        console.log(res);
        this.getOrg();
      });
  }

  searchOrg(value: string) {
    const searchName = {"name": value};
    const url = `organization?sortBy=name&sortOrder=asc&search=${JSON.stringify(searchName)}`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
      });
  }

  intialForm(orgData: any) {
    this.dataForm = this.fb.group({
      name: [orgData ? orgData.name : '']
    });
  }

  showForm(orgData: any) {
    this.selectedOrg = orgData;
    this.tableShow = false;
    this.formShow = true;
    this.intialForm(orgData);
  }

  goPrev() {
    this.formShow = false;
    this.tableShow = true;
  }
}
