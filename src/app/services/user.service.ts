import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL_PREFIX} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // get all users (visitors + profiles)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${URL_PREFIX}/users`);
  }
  // TODO implement on backend
  // get all visitors
  getVisitors(): Observable<User[]> {
    return this.http.get<User[]>(`${URL_PREFIX}/visitors`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${URL_PREFIX}/users/${id}`);
  }

}
