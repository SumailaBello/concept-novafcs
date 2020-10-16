import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef  } from '@angular/core';
import { DataService } from '../data.service';
import { NavigationEnd } from '@angular/router';
// import { ModalComponent } from '../modal/modal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
// import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modalRef: MDBModalRef;

  constructor(public data: DataService) { }

  public innerWidth: any;
  private _opened: boolean = false;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.data.router.navigateByUrl('/dashboard/home');
    this.routeEvent();
    // this.data.getLocation();
    // console.log(this.data.cookie.get("token"));

    // cookie available as we are coming from login page
    if(this.data.rememberMe) {
      this.data.token = this.data.cookie.get("token");
      this.data.name = this.data.cookie.get("name");
      // console.log(this.data.name);
    }
    
  }

  // V-w&pjPwQW'C4j2j
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  // on wondow resize 
  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth < 768) {
    this._opened = false;
  }

  // console.log(this.innerWidth)
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  currentRoute: string = "/dashboard";
  routeEvent() {
    this.data.router.events.subscribe( data => {
      // this.currentRoute = data instanceof NavigationEnd;
      if(data instanceof NavigationEnd) {
        this.currentRoute = data.url;
      }

      // console.log(data);
      // console.log(this.currentRoute);
    })
  }

  // open and closing of modal
  @ViewChild("modal", {static: false}) modalEl: ElementRef
  openModal() {
    this.modalEl.nativeElement.style.display="flex";
  }

  // close info modal
  closeModal() {
    this.modalEl.nativeElement.style.display="none";
  }

}
