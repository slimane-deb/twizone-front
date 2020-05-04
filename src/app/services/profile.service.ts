import { Injectable } from '@angular/core';
import { URL_PREFIX } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoggedInUser} from '../models/interfaces';
import {Profile} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  // get all profiles
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${URL_PREFIX}/profiles`);
  }

  // TODO implement
  getActiveProfiles(): Observable<Profile[]> {
    // get available profiles
    return null;
  }

  getProfileByUserId(userId: number): Observable<LoggedInUser> {
    return this.http.get<LoggedInUser>(`${URL_PREFIX}/profiles/${userId}`);
  }

  // update
  /**
   * @param id profileId
   * @param statusInteger (0) - AVAILAbLE; (1) - UNAVAILABLE
   */
  updateProfileStatus(id: number, statusInteger: number): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/profiles/${id}`, { status: statusInteger });
  }

  updateProfileAvailableDate(id: number, date: Date): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/profiles/${id}/date`, { availableFrom: date });
  }

  updateProfilePosition(id: number, currentPosition: string): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/profiles/${id}/position`, { position: currentPosition });
  }

  getProfilesByProfession(selectedProfession: string): Observable<any> {
    return this.http.post<any>(`${URL_PREFIX}/profiles/profession`, { profession: selectedProfession });
  }
}
