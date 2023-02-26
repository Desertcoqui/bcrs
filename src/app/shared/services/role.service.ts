/**
 * Bob's Computer Repair Shop
 * Author: Professor Krasso
 * Modified: Kailee Stephens
 * Date : 02/25/2023
 * Description: role.service.ts
*/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/role.interface";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) { }

    findAllRoles(): Observable<any> {
        return this.http.get('/api/roles');
    }

    findRoleById(roleId: string): Observable<any> {
        return this.http.get(`/api/roles/${roleId}`);
    }

    createRole(role: Role): Observable<any> {
        return this.http.post(`/api/roles`, {
            text: role.text
        });
    }

    updateRole(roleId: string, role: Role): Observable<any> {
        return this.http.put(`/api/roles/${roleId}`, {
        text: role.text
        });
    }

    deleteRole(roleId: string): Observable<any> {
        return this.http.delete(`/api/roles/${roleId}`);
    }

    findUserRole(userName; string): Observable<any> {
        console.log('username from the finUserRole API ' + userName);
        return this.http.get(`api/users/${userName}/role`);
    }
}