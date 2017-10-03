import {Component, OnInit} from '@angular/core';
import {Department} from './department.model';
import {AppServiceService} from '../app-service.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  showTable = true;
  showForm = false;

  departmentList: Department[] = [];
  organizations = [];

  departmentForm: FormGroup;
  selectDepartment = null;

  constructor(private appService: AppServiceService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getDepartment();
  }

  getDepartment(): void {
    const url = `department`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
        this.departmentList = res.payload.data;
      });
  }

  getOrg() {

    const url = `organization`;
    this.appService.getAPI(url)
      .subscribe(res => {
        console.log(res);
        this.organizations = res.payload.data;
      });
  }

  removeDepartment(id: number, index: number): void {
    const url = `department/${id}`;
    this.appService.deleteAPI(url)
      .subscribe(res => {
        this.departmentList.splice(index, 1);
        console.log(res);
      });
  }

  addDepartment(formValue: any) {
    if (this.selectDepartment == null) {
      const url = `department`;
      this.appService.postAPI(url, formValue)
        .subscribe(res => {
            console.log(res);
            this.getDepartment();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    } else {
      const url = `department/${this.selectDepartment.id}`;
      this.appService.putAPI(url, formValue)
        .subscribe(res => {
            console.log(res);
            this.getDepartment();
            this.showTable = true;
            this.showForm = false;
          },
          msg => {
            console.log(`Error: ${msg.status} ${msg.statusText}`);
          });
    }
  }

  initial(departmentData: any) {
    this.departmentForm = this.fb.group({
      org_id: [departmentData ? departmentData.org_id : ''],
      department: [departmentData ? departmentData.department : '']
    });
  }

  goPrev() {
    this.showForm = false;
    this.showTable = true;
  }

  showProperty(departmentData: any) {
    this.showForm = true;
    this.showTable = false;
    this.initial(departmentData);
    this.selectDepartment = departmentData;
    this.getOrg();
  }

}
