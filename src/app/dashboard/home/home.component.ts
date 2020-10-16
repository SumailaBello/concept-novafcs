import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef   } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  
  constructor(public data: DataService) { }

  ngOnInit() {
    this.getSites()
  }

  alertMsg
  loading: boolean;
  showAlert: boolean;
  success: boolean;

  sites;
  getSites() {
    this.loading = true;
    this.data.getSites().subscribe( data => {
      console.log(data)
      if(data.success && data.code == 200) {
        this.sites = data.message;
      }
      else {
        this.alert(data.message)
      }
    }, error => {
      console.log(error)
      this.loading = false;
      this.alert(error.message)
    },
    ()=> {
      this.loading = false
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
