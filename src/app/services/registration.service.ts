import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileRegistrationDetails} from '../models/profile-registration-details';
import {RegistrationDetails} from '../models/registration-details';
import {Observable} from 'rxjs';
import {URL_PREFIX} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(details: RegistrationDetails | ProfileRegistrationDetails): Observable<any> { // returns user or exception
    if (details instanceof RegistrationDetails) {
      return this.http.post<any>(`${URL_PREFIX}/register`, {
        username: details.username,
        password: details.password,
      });
    } else if (details instanceof ProfileRegistrationDetails) {
      return this.http.post<any>(`${URL_PREFIX}/register`, {
        username: details.username,
        password: details.password,
        role: details.role,
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        professionId: details.professionId,
      });
    } else {
      throw new Error('Something went wrong');
    }
  }
}
