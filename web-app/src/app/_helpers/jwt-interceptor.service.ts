import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationServiceService } from '../_services/authentication-service.service'
@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

    constructor(private ijt: Injector) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let auth = this.ijt.get(AuthenticationServiceService);

        let currentUser = auth.getStoreCookie()
    
        if (currentUser) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}