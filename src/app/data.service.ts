import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public router: Router, public http: HttpClient, public cookie: CookieService) { }

navData;

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
  // get all sites
  getSites() {
    console.log(this.token)
    return this.http.get<any>(`https://fcs.concept-nova.com/api/v1/sites/?token=${this.token}`);
  } 

  // get all tanks
  getTanks(siteID) {
    console.log(this.token)
    return this.http.get<any>(`https://fcs.concept-nova.com/api/v1/sites/${siteID}?token=${this.token}`);
  } 

  // view single tank details
  site; //site obj
  viewTank(siteID, tankID) {
    console.log(this.token)
    return this.http.get<any>(`https://fcs.concept-nova.com/api/v1/sites/${siteID}/${tankID}?token=${this.token}`);
  }  

  logout() {
    this.cookie.delete("user");
    this.cookie.delete("token");
    this.cookie.deleteAll('/')
    this.router.navigateByUrl("/login");
  }
}
