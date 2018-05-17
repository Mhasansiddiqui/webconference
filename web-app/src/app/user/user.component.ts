import { Component, ChangeDetectorRef } from '@angular/core';

import { AlertServcieService } from '../_services/alert-servcie.service';
import { UserServiceService } from '../_services/user-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { passwordMatcher } from '../validation/validation'
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy, } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { Jsonp } from '@angular/http/src/http';
import { AuthenticationServiceService } from '../_services/authentication-service.service'

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private listTitles: any[];
  location: Location;

  constructor(
    private alertService: AlertServcieService,
    private cd: ChangeDetectorRef,

    private Auth: AuthenticationServiceService,
    private userService: UserServiceService,
    private routerurl: Router,
    private route: ActivatedRoute,
    private router: Router,
    location: Location,
    private element: ElementRef

  ) {
    this.location = location;

  }
  model = {};
  loading = false;

  keys: string = '';
  isEmailExist = false;
  isUserExist = false;

  user = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;

  }


  save(model: any, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
    if (!this.isEmailExist && !this.isUserExist) {

      this.loading = true;
      this.userService.updateProfile(model)
        .subscribe(
        data => {
          this.loading = false;
          console.log(data)
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('account settings saved', true);

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }


  onEmailBlur(value: any) {
    if (RegExp('^[a-zA-Z0–9_.+\\-\\]+@[a-zA-Z0–9-]+.[a-zA-Z0–9\\-\\.]+$').test(value) && value != '') {
      this.userService.getEmailExist(value)
        .subscribe(data => {

          if (data['data']['user']) {
            console.log('true')
            this.isEmailExist = true;
            this.cd.markForCheck();
          }
          else {
            this.isEmailExist = false;
            this.cd.markForCheck();
          }
        }, error => {
          console.log(error)
        })
    }
    else {
      this.isUserExist = false;
      this.cd.markForCheck();

    }
  }
  onEmailKey(value: any) {

    if (RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$').test(value) && value != '') {
      this.userService.getEmailExist(value)
        .subscribe(data => {

          if (data['data']['user']) {
            console.log('true')
            this.isEmailExist = true;
            this.cd.markForCheck();
          }
          else {
            this.isEmailExist = false;
            this.cd.markForCheck();
          }
        }, error => {
          console.log(error)
        })
    }
    else {
      this.isUserExist = false;
      this.cd.markForCheck();

    }
  }

  onUserBlur(value: any) {
    if (value != '') {
      this.userService.getUserExist(value)
        .subscribe(data => {
          if (data['data']['user']) {
            console.log('true')
            this.isUserExist = true;
            this.cd.markForCheck();
          }
          else {
            this.isUserExist = false;
            this.cd.markForCheck();

          }
        }, error => {
          console.log(error)
        })
    }
    else {
      this.isUserExist = false;
      this.cd.markForCheck();

    }
  }
  onUserKey(value) {

    if (value != '') {
      this.userService.getUserExist(value)
        .subscribe(data => {
          if (data['data']['user']) {
            console.log('true')
            this.isUserExist = true;
            this.cd.markForCheck();
          }
          else {
            this.isUserExist = false;
            this.cd.markForCheck();

          }
        }, error => {
          console.log(error)
        })
    }
    else {
      this.isUserExist = false;
      this.cd.markForCheck();

    }

  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.split('/').pop();
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['./login']);
  }




}
