import { Component, OnInit } from '@angular/core';
import {Place} from '../../model/Place';
import {PlacesService} from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  places: Place[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
      this.places = this.placesService.getAll();
  }

}
