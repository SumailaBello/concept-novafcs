import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef    } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DataService } from '../../data.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-tanks',
  templateUrl: './tanks.component.html',
  styleUrls: ['./tanks.component.scss']
})
export class TanksComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  constructor(public data: DataService, private location: Location) { }

  site;
  ngOnInit() {
    this.site = this.data.navData;
    this.getTanks(this.site.site_id);
  }

  alertMsg
  showAlert: boolean = false;
  showLoader: boolean = false;
  success: boolean;

  tanks;
  getTanks(siteID) {
    this.showLoader = true;
    this.data.getTanks(siteID).subscribe( data => {
      this.showLoader =false;
      console.log(data)
      if(data.success && data.code == 200) {
        this.tanks = data.message;
      }
      else {
        this.alert(data.message)
      }
    }, error => {
      console.log(error)
      this.showLoader = false;
      this.alert(error.message)
    },
    ()=> {
      this.showLoader = false
    })
  }

  viewTank(site, tank) {
    this.data.navData =  tank;
    this.data.site =  site;
    this.data.router.navigateByUrl("/dashboard/view-tank");
  }
    
  alert(message) {
    this.success = false;
    this.showAlert = true;
    this.alertMsg = message;
  }
}
