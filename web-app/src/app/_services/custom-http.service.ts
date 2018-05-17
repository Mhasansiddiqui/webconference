import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthenticationServiceService } from '../_services/authentication-service.service'
import { Response } from 'express';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    auth;
    changeUrl;

    constructor(private ijt: Injector) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth = this.ijt.get(AuthenticationServiceService);
        let currentUser = this.auth.getStoreCookie()

        if (currentUser) {
            this.changeUrl = req.clone({ url: req.url + "?_id=" + currentUser._id });
            return next.handle(this.changeUrl);
        }

        return next.handle(req);

    }
}