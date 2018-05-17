import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationServiceService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    login(email: string, password: string, isRemeberMe: boolean) {
        return this.http.post<any>('/api/authenticate', { email: email, password: password })
            .map(data => {

                // login successful if there's a jwt token in the response
                if (data.user && data.user.token) {
                    let userAuth = JSON.stringify({ token: data.user.token, _id: data.user._id, isRemeberMe: isRemeberMe });
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if (isRemeberMe) {
                        this.cookieService.set("currentUser", userAuth, new Date(data.expire));
                    }
                    else {
                        this.cookieService.set("currentUser", userAuth);
                    }
                }

                return data;
            });
    }


    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        this.cookieService.deleteAll();
    }
    getStoreUser() {
        return this.cookieService.get("currentUser")

    }
    getStoreCookie() {
        let cookie = this.cookieService.getAll();
     
        if (cookie.hasOwnProperty('currentUser')) {
  
            return JSON.parse(cookie['currentUser'])
        }
        return false;
    }
}