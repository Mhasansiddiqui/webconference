import { Component, OnInit, HostListener } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

import { AuthenticationServiceService } from '../app/_services/authentication-service.service';
import {APP_BASE_HREF} from '@angular/common';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isLogin = false
  constructor(public location: Location, private auth: AuthenticationServiceService) {
    console.log();

  }

  ngOnInit() {
    console.log()
  }

  isMap(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }

  @HostListener('window:onbeforeunload', ['$event'])
  onBeforeUnload() {
   
    if (!this.auth.getStoreCookie()['isRemeberMe']) {
      this.deleteAllCookies();
    }
  }

  deleteAllCookies() {

    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
