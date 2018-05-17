import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../_services/user-service.service';
import { ROUTES } from '../sidebar/sidebar.component';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  returnUrl: string;
  userExist;

  private isAdmin: boolean = false;

  user = {
    isActivated: false
  }

  constructor(
    location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,

    private element: ElementRef
  ) {

    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

  }

  ngOnInit() {
    /* 
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0]; */

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.route.url['value'].length == 0) {
     
     // this.router.navigate(['./'])
    }
    else if (this.route.url['value'][0]) {
      this.userService.getUserProfile(this.route.url['value'][0].path)
        .subscribe((data) => {
          if (data) {
            this.user = data['users'].data;
            this.userExist = true;
          }
          else {
            // this.router.navigate([this.returnUrl]);
            this.userExist = false;
          }

        }, (error) => {
          console.log(error);
        })
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
  return() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['./login']);
  }
  setting() {
    this.router.navigate(['./setting']);
  }

}
