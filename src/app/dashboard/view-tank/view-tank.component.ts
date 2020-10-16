import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef    } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-view-tank',
  templateUrl: './view-tank.component.html',
  styleUrls: ['./view-tank.component.scss']
})
export class ViewTankComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  constructor(public data: DataService) { }

  tank;
  site;
  ngOnInit() {
    this.tank = this.data.navData;
    this.site = this.data.site
    this.viewTank(this.site.site_id, this.tank.tank_id);
  }

  alertMsg
  loading: boolean;
  showAlert: boolean;
  success: boolean;

  tankObj;
  viewTank(siteID, tankID) {
    this.loading = true;
    this.data.viewTank(siteID, this.tank.tank_id).subscribe( data => {
      console.log(data)
      if(data.success && data.code == 200) {
        this.tankObj = data.message;
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
    
  alert(message) {
    this.success = false;
    this.showAlert = true;
    this.alertMsg = message;
  }

}
