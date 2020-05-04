import { Injectable } from '@angular/core';
import {Place} from '../../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] = [
    {
      id: '1',
      title: 'Mzab Vally',
      description: 'Une place super touristique',
      city : {id: 0, name: 'Ghardaia', wilaya: 'Ghardaia'},
      imgUrl: 'assets/places/mzab-valley.jpg',
    },
    {
      id: '2',
      title: 'Golea',
      city : {id: 0, name: 'Meniaa', wilaya: 'Ghardaia'},
      imgUrl: 'assets/places/golea-meniaa.jpg',
    }
  ];

  constructor() { }
  getAll() {
    return [...this.places];
  }

  getOne(placeId: string) {
    return {
      ...this.places.find(x => {
        return x.id === placeId;
      })
  };
  }
  saveToggle(placeId: string) {
    this.places.find(x => {
      return x.id === placeId;
    }).isSaved = true;
  }
}
