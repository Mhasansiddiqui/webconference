import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_model/user';
@Injectable()
export class UserServiceService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/allUsers');
    }
    getActiveStatus(id) {
        return this.http.get<User[]>('/api/getActiveStatus');
    }

    getById(id: string) {
        return this.http.get('/api/users');
    }
    getByUserId(id: string) {
        return this.http.get('/api/user?userid=' + id + '&');
    }

    create(user: User) {
        return this.http.post('/auth/users', user);
    }
    updateProfile(user) {
        return this.http.post('/api/updateProfile', user);
    }

    update(user: any) {
        return this.http.put('/api/users', user);
    }

    delete(id: string) {
        return this.http.post('/api/deleteUsers/', { id: id });

    }
    getUserExist(username) {
        return this.http.get<User[]>('/api/userExist?username=' + username + '&');
    }
    getEmailExist(email) {
        return this.http.post<User[]>('/api/emailExist', { email: email });
    }
    getUserEmail(user) {
        return this.http.get('/api/emailUser?username=' + user.username);
    }
    postConfirmPassword(email) {
        return this.http.post<User[]>('/auth/confirmPassReq', { email: email, resetPassordReq: true });
    }
    resendEmail() {
        return this.http.get('/api/resendEmailToken');
    }
    getUserProfile(username) {
        return this.http.get('/api/userprofile?username=' + username + '&');
    }
}
