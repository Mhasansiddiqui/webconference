import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServcieService } from '../_services/alert-servcie.service';
import { UserServiceService } from '../_services/user-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { passwordMatcher } from '../validation/validation'
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
/* import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
 */
@Component({
    moduleId: module.id,
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {
    model: any = { isAdmin: false };
    loading = false;
    public user: any;
    keys: string = '';
    isEmailExist = false;
    isUserExist = false;
    showEmailError = false;


    constructor(
        private router: Router,
        private userService: UserServiceService,
        private alertService: AlertServcieService,
        private cd: ChangeDetectorRef


    ) { }


    ngOnInit() {
        this.user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    save(model: any, isValid: boolean) {
        // call API to save customer
        if (!this.isEmailExist && !this.isUserExist) {

            this.loading = true;
            this.userService.create(model)
                .subscribe(
                data => {
                    this.loading = false;
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
        else{
            this.showEmailError = true;
        }
    }


    onEmailBlur(value: any) {


        if (/* RegExp('/^(([^>()\[\]\\.,;:\s@]+(\.[^>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/').test(value) && */ value != '') {

        console.log(value);
            this.userService.getEmailExist(value)
                .subscribe(data => {

                    if (data['data']['user']) {
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
            this.showEmailError = true;
            this.isUserExist = false;
            this.cd.markForCheck();

        }
    }
    onEmailKey(value: any) {

        this.showEmailError = false;


        if (/* RegExp('/^(([^>()\[\]\\.,;:\s@]+(\.[^>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/').test(value) && */ value != '') {



            this.userService.getEmailExist(value)
                .subscribe(data => {

                    if (data['data']['user']) {
                       
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


        console.log(value);

        if (value != '') {

            this.userService.getUserExist(value)
                .subscribe(data => {
                    if (data['data']['user']) {
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

    /* register() {

        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.loading = false;
                console.log(data)
                // set success message and pass true paramater to persist the message after redirecting to the login page
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    } */
}
