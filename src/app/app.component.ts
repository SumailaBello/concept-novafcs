import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Fuel Control System';
  constructor(public data: DataService) {}

  ngOnInit() {
    if(!this.data.cookie.get("token") ) {
      this.data.router.navigateByUrl("/login", {replaceUrl: true});
    }
    // got to dashboard if a cookie exists
    else {
      this.data.router.navigateByUrl("/dashboard", {replaceUrl: true});
    }
  }
}
