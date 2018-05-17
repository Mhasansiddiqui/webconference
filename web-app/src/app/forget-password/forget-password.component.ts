import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../_services/user-service.service';
import {AlertServcieService} from '../_services/alert-servcie.service'
@Component({
  moduleId: module.id,
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  model = { email: '' };

  constructor(private userService: UserServiceService,private alert : AlertServcieService) { }

  ngOnInit() {
  }
  forgetPass() {
    this.userService.postConfirmPassword(this.model.email)
      .subscribe(data => {
        this.alert.success("Email has been sent to your account!")
      
      }, error => {
        this.alert.error("error email not sent")
        console.log(error);
      })
  }

}
