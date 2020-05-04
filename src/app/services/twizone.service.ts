import { Injectable } from '@angular/core';
import {Profile, Profession} from '../models';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwizoneService {

  constructor(private http: HttpClient) { }
  selectedProfile: Profile;
  selectedProfession;
  categoreisUrl = 'https://5bcce576cf2e850013874767.mockapi.io/task/categories';
  getMarket() {
    return this.http.get<Profession[]>(this.categoreisUrl).pipe(map((res: Profession[]) => {
      return res.map((res: Profession) => {
        return {
          ...res
        }
      });
    }));
  }
  getProfession(id) {
    return this.http.get<Profession>(this.categoreisUrl + '/' + id);

  }
  setProfileandProfession(prod, ProfessionName) {
    this.selectedProfile = prod;
    this.selectedProfession = ProfessionName;
  }
  getProfileandProfession() {
    return { ...this.selectedProfile, ...this.selectedProfession };
  }
}
