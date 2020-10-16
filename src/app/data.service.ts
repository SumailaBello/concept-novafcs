import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public router: Router, public http: HttpClient, public cookie: CookieService) { }

  // register user
  // register(body: object) {
  //   return this.http.post<any>("http://ec2-52-14-102-107.us-east-2.compute.amazonaws.com:3000/api/payday/register_admin", body)
  // }

  // login user
  login(body) {
    return this.http.post<any>("https://fcs.concept-nova.com/api/v1/login", body)
  }

  //sets token
  token: string;
  name: string;
  rememberMe: boolean = true;
  setCookie(token) {
    this.cookie.set('token', token, 1, '/');
    console.log("Working")
  }

  // gets token from cookie
  getCookie() {
    this.token = this.cookie.get("user");
    console.log(this.token);
  }

  date;

  pageNum: number= 0;
  totalTransfers: number = 0;
  // get all uploaded details for transfers
  getSites() {
    return this.http.get<any>(`https://fcs.concept-nova.com/api/v1/sites/?token=${this.token}`);
  }  

  logout() {
    this.cookie.delete("user");
    this.cookie.delete("token");
    this.cookie.deleteAll('/')
    this.router.navigateByUrl("/login");
  }
}
