import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserServiceService } from '../../_services/user-service.service'
import { Jsonp } from '@angular/http/src/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationServiceService } from '../../_services/authentication-service.service'
import { ConfirmationService, Message } from 'primeng/primeng';



import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
  providers:[MessageService]
})
export class ActivationComponent implements OnInit {

  show = false;

  msgs: Message;
  constructor(private messageService: MessageService, private Auth: AuthenticationServiceService, private cd: ChangeDetectorRef, private routerurl: Router, private route: ActivatedRoute, private router: Router, private userService: UserServiceService) {

  }

  ngOnInit() {
    let user = JSON.parse(this.Auth.getStoreUser())
    let param = this.router.parseUrl(this.router.url);
    if (this.router.url.substr(0, 8) == '/user?id' && param.queryParams.id) {

      this.cd.markForCheck();
      this.show = false;
      /*    this.userService.getActiveStatus(this.router.params['_value']['id']).subscribe((u) => {
           this.show = u['users'].data.isActivated
         }) */
    }
    else if (user._id) {
      this.userService.getActiveStatus(user._id).subscribe((u) => {

        if (u) {
          this.show = !u['users'].data.isActivated;
          this.cd.markForCheck();
        }
      })
    }
    else {
      this.show = false;
      this.cd.markForCheck();
    }

  }

  resendEmail() {
    this.userService.resendEmail().subscribe((u) => {
      if (u) {
        this.messageService.add({ severity: 'success', summary: 'Email Sent', detail: 'please check your mail box' });
      }
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Email', detail: 'Email Not Sent' });
      console.log(error)
    })
  }
}


