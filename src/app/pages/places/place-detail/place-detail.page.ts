import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlacesService} from '../places.service';
import {Place} from '../../../model/Place';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private router: Router,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if (!param.has('placeId')) {
        // redirect
        return;
      }
      const placeId = param.get('placeId');
      this.place = this.placesService.getOne(placeId);
    });
  }

  onSave() {
    this.alertController.create({
      header: 'Place Saved to your bookmarks',
      buttons: [{
        text: 'OK',
        role: '',
        handler: () => {
          this.placesService.saveToggle(this.place.id);
          // this.router.navigate(['/bookmarks']);

        }
      }]
    }).then(alertElt => {
      alertElt.present();
    });
  }
}
