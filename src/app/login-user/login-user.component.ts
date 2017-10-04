import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {


  ngOnInit() {
  }

  constructor(private http: Http, private routes: Router) {
  }

  login(form: NgForm) {

    const url = `https://mvp-dev-extensionsapi.visumenu.com/signin`;
    this.http.post(url, form.value)
      .subscribe(res => {

        // console.log(res);
        const response = res.json();
        const token = response.payload.token.access_token;
        sessionStorage.setItem('currentUser', token);
        if (response.status === 200) {
          this.routes.navigate(['infoTable']);
        }
      });
  }

  /* Login User Details:
   * Username: visumenu
   * Password: visumenu1 */

  // doHeader(token: string){
  //   let header = new Headers();
  //   header.append('Authorization', token );
  //   let option = new RequestOptions();
  //   option.headers = header;
  //   let url = `https://mvp-dev-extensionsapi.visumenu.com/phoneDetail?pageNumber=1&recordsPerPage=3&totalPage=0&sortBy=phone_number&sortOrder=asc`;
  //   this.http.get(url, option)
  //     .subscribe(res => {
  //         const response = res.json();
  //         const path = response.payload.data;
  //         this.array.push(path);
  //         },
  //       msg => console.log(`Error: ${msg.status} ${msg.statusText}`));
  // }

}
