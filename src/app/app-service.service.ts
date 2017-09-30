import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppServiceService {

  baseUrl = `https://mvp-dev-extensionsapi.visumenu.com/`;

  constructor( private http: Http) { }

  getAPI(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, this.Headers)
      .map(res => {
      return res.json();
    });
  }

  deleteAPI( endpoint: string): Observable<any> {
    return this.http.delete(this.baseUrl + endpoint, this.Headers)
      .map(res => {
        return res.json();
      });
  }

  postAPI(endpoint: string, formVal: any): Observable<any> {
    return this.http.post(this.baseUrl + endpoint, formVal, this.Headers)
      .map(res => {
        return res.json();
      });
  }

  putAPI(endpoint: string, formVal: any): Observable<any> {
    return this.http.put(this.baseUrl + endpoint, formVal, this.Headers)
      .map(res => {
        return res.json();
      });
  }

  get Headers(): RequestOptions{
    const header = new Headers();
    header.append('Authorization', sessionStorage.getItem('currentUser'));
    const option = new RequestOptions();
    option.headers = header;
    return option;
  }
}
