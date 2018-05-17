import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertServcieService } from '../_services/alert-servcie.service';
import { UserServiceService } from '../_services/user-service.service'
import { AuthenticationServiceService } from '../_services/authentication-service.service';

import { model } from 'mongoose';

@Component({
    moduleId: module.id,
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    model: any = { isRemberMe: false };
    loading = false;
    returnUrl: string;
    isLogin = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationServiceService,
        private alertService: AlertServcieService,
       
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password, this.model.isRemberMe)
            .subscribe(
            data => {
                this.loading = false;
                if (data.user) {
                    if (data.user.isAdmin) {

                        this.router.navigate(['/dashboard']);
                    }
                    else {
                        this.router.navigate([this.returnUrl]);
                    }
                }
                else {
                    this.isLogin = false;
                    this.alertService.error(data.message);
                    this.loading = false;
                }
            },
            error => {
                this.isLogin = false;
                this.alertService.error(error);
                this.loading = false;
            });
    }

}
