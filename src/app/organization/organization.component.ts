import { Component, OnInit } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  details = [];
  dataForm: FormGroup;
  show = true;
  addShow = false;
  selectedOrg = null;

  constructor( private http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.getOrg();
  }

  getOrg() {
    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));

    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/organization?pageNumber=1&recordsPerPage=20`;
    this.http.get(url, option)
      .subscribe( res => {
        console.log(res.json());
        this.details = res.json().payload.data;
        // console.log(this.details);
      });
  }

  addOrg(formVal: any) {
    // this.dataForm = this.fb.group({
    //   name: ['formVal']
    // });

    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));

    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/organization`;
if (this.selectedOrg == null) {
    this.http.post(url, formVal, option)
      .subscribe(res => {
        console.log(res.json());
        this.details.push(res.json().payload.data);
        console.log(this.details);
      },
      msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
} else {
  this.http.put(url + '/' + this.selectedOrg.id, formVal, option)
    .subscribe(res => {
        console.log(res.json());
        // this.details.push(res.json().payload.data);
        // console.log(this.details);
      this.getOrg();
      },
      msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
}
    this.show = true;
    this.addShow = false;
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

  doRemove(id: number, index: number) {

    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));

    const option = new RequestOptions();
    option.headers = header;

    const url = `https://mvp-dev-extensionsapi.visumenu.com/organization/${id}`;
    this.http.delete(url , option)
      .subscribe(res => {
        this.details.splice(index, 1);
        console.log(res.json());
      });
  }

  intialForm(orgData: any) {
    this.dataForm = this.fb.group({
      name: [orgData ? orgData.name : '']
    });
  }


  showForm(orgData: any) {
    this.selectedOrg = orgData;
    this.show = false;
    this.addShow = true;
    this.intialForm(orgData);
  }

  goPrev() {
    this.addShow = false;
    this.show = true;
  }
}
