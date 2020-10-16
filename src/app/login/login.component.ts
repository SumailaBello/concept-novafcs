import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public data: DataService) { }

  segment: string = "login";
  ngOnInit() {
  }

  switchSegment(segment) {
    this.segment = segment;
    // console.log(this.segment);
  }

  showAlert: boolean = false;
  showLoader: boolean = false;
  
  alertMsg : string;
 
  check(event) {
    // console.log(event);
    this.data.rememberMe = event.checked;
  }

  showPassword: boolean = false;
  togglePasswordText() {
    this.showPassword = !this.showPassword;
  }

  login(form) {     
    // console.log(form)                                                
    this.showLoader = true;
    // let body = form.value;
    console.log(form.value);
    const body =  {
      email: form.value.email,
      password: form.value.password
    }
    console.log(body)
    this.data.login(body).subscribe( 
      data => {
        console.log(data);
        // return;
        if(!data.success) {
          this.alertMsg = data.result;  //error message displayed on the alert
          // alert("Error");
          // error = data;
          this.alert(this.alertMsg)
        }
        else if(data.success && data.code == 200) {
          
          if(this.data.rememberMe) {
            // this.data.token = data.token;
            this.data.setCookie(data.message.token);
            // console.log(this.data.token);
            // setting name of user to cookie
            // this.data.cookie.set("name", data.result.name);
            // console.log(data.result.name)
          }
          this.data.token = data.message.token;
          // this.data.name = data.result.name;
          // this.data.navData = data;
          this.data.router.navigateByUrl("/dashboard")
        }

      },
      error => {
        //error function does not run when there is an error use the above instead
        console.log(error);
        this.showLoader = false;
        this.alertMsg = error.error.result;
        this.alert(this.alertMsg);
      },
      () => {
        // console.log("Completed");
        this.showLoader = false;
        // this.showAlert = false;
      })
  }

  // register(form) {
  //   this.showLoader = true
  //   let body = form.value;
  //   console.log(form.value);
  //   this.data.register(body).subscribe( 
  //     data => {
  //       console.log(data);
  //       if(!data.success) {
  //         this.alertMsg = data.result;
  //         this.alert(this.alertMsg)
  //       }
  //       else {
  //         this.closeAlert() //removes alert if it is currently displayed
  //         this.success(); // show success message 
  //       }

  //     },
  //     error => {
  //       //error function does not run when there is an error use the above instead
  //       console.log(error);
  //       this.alertMsg = error.error.result;
  //       this.alert(this.alertMsg);
  //     },
  //     () => {
  //       console.log("Completed");
  //       this.showLoader = false;
  //     })
  // }

  // displays alert
  alert(message) {
    this.showAlert = true;
    this.alertMsg = message;
  }

  closeAlert() {
    this.showAlert = false;
  }

  // shows success message on registration success
  // showSuccess = false;
  // successMsg;
  // success() {
  //   this.successMsg = "Registration Success";
  //   this.showSuccess = true;
  //   setTimeout ( ()=> {
  //     this.switchSegment('login')
  //   }, 1500)
  // }

  // closeSuccess() {
  //   this.showSuccess = false;
  // }

}
