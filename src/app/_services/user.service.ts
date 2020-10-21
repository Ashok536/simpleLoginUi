import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getAllById(id: number) {
        // let headers = new HttpHeaders();
        // headers = headers.append("Authorization", `Bearer ${this.currentUserValue.token}`);
        // const httpOptions = { headers: headers };
        return this.http.get<User[]>(`${config.apiUrl}/users/validateGetAll/${id}`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}