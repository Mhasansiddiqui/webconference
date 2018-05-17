import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../_services/user-service.service';

import { AlertServcieService } from '../_services/alert-servcie.service';

@Component({
  moduleId: module.id,
  selector: 'app-forget-email',
  templateUrl: './forget-email.component.html',
  styleUrls: ['./forget-email.component.css']
})
export class ForgetEmailComponent implements OnInit {

  constructor(private alertService: AlertServcieService, private userService: UserServiceService) { }
  model = {};
  userStatus = false;
  ngOnInit() {
  }
  user = { username: '' }
  email: string = '';

  find(user) {
    console.log(user);
    this.userService.getUserEmail(user)
      .subscribe(data => {
        if (data && data['data']['user']['email']) {
          this.email = data['data']['user']['email'];
          this.userStatus = false;
        }
        else {
          this.email = data['data']['user'];
          this.userStatus = true;
        }
      }, error => {
        console.log(error);

        this.alertService.error(error);
      })
  }

}
