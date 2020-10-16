import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef   } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DataService } from '../../data.service';
import { HttpHeaders } from '@angular/common/http'; 

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

  // site_id": 12345,
  //           "site_name": "Site 1",
  //           "site_tank_count"
  sites;
  getSites() {
    this.loading = true;
    this.data.getSites().subscribe( data => {
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
  // displays alert
  
  alert(message) {
    this.success = false;
    this.showAlert = true;
    this.alertMsg = message;
  }
}
