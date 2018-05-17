import { Component, OnInit, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { Jsonp } from '@angular/http/src/http';
import { UserServiceService } from '../_services/user-service.service';
import { AuthenticationServiceService } from '../_services/authentication-service.service'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private user;
  private isAdmin: boolean = false;
  url: string;

  constructor(
    private Auth: AuthenticationServiceService,
    private userService: UserServiceService,
    private routerurl: Router,
    private route: ActivatedRoute,
    private router: Router,
    location: Location,
    private element: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }



  ngOnInit() {
    let param = this.router.parseUrl(this.router.url);

    let s = this.router.url.replace("/", "")
    let ss = RegExp(/[a-zA-Z]/g).test(s)


    this.user = JSON.parse(this.Auth.getStoreUser())
    if (ss && !param.queryParams.id && !param.queryParams.hasOwnProperty('_id')) {
      this.router.navigate(['./userProfile/'+s]);
      window.history.pushState('', '', s)
    }

   else if (this.router.url.substr(0, 8) == '/user?id' && param.queryParams.id) {


      this.isAdmin = true;
      this.userService.getByUserId(param.queryParams.id)
        .subscribe((data) => {
          this.user = data['users']['data'];
          this.cd.markForCheck();
        })
    }
    else if (!param.queryParams.hasOwnProperty('_id')) {
      this.userService.getById(this.user._id).subscribe(
        (response) => {
          if (response['users'].data.isAdmin) {
            this.router.navigate(['./dashboard']);
          }
          else if (!response['users'].data.isAdmin) {

            this.isAdmin = false;

            this.user = response['users']['data'];
            this.cd.markForCheck();

          }
        },
        (error) => { this.router.navigate(['./login']); })
    }
    else {
      this.isAdmin = false;
      this.user = JSON.parse(this.Auth.getStoreUser())
      this.userService.getById(this.user._id)
        .subscribe((data) => {
          this.user = data['users']['data'];
          this.cd.markForCheck();
        })
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

  }

  goBack() {


    window.history.back();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['./login']);
  }
  setting() {
    this.router.navigate(['./setting']);
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
}
