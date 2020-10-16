import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef   } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DataService } from '../../data.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  
  constructor(public data: DataService, private location: Location) { }

  ngOnInit() {
    this.getSites();
    this.location.subscribe(x => console.log(x));
  }

  ngOnDestroy() {
  }

  alertMsg
  showLoader: boolean;
  showAlert: boolean;
  success: boolean;

  sites;
  getSites() {
    this.showLoader = true;
    this.data.getSites().subscribe( data => {
      console.log(data);
      this.showLoader = false
      if(data.success && data.code == 200) {
        this.sites = data.message;
      }
      else {
        this.alert(data.message)
      }
    }, error => {
      console.log(error)
      this.showLoader = false
      this.alert(error.statusText)
    },
    ()=> {
      this.showLoader = false;
    })
  }

  viewTanks(siteID) {
    this.data.navData =  siteID;
    this.data.router.navigateByUrl("/dashboard/tanks");
  }
  // displays alert
  
  alert(message) {
    this.success = false;
    this.showAlert = true;
    this.alertMsg = message;
  }
}
