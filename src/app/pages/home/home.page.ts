import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Profession} from '../../models';
import {TwizoneService} from '../../services/twizone.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categories: Profession[];
  constructor(public navCtrl: NavController, private twizoneService: TwizoneService) {}
  goToListing(...args: []) {
    let newRoute = '';

    args.forEach(arg => {
      if (newRoute.length > 1) {
        newRoute += '&&q=' + arg;

      } else {
        newRoute += '?q=' + arg;
      }
    });
    this.navCtrl.navigateForward('listing' + newRoute);
  }
  ngOnInit(): void {
    this.twizoneService.getMarket().subscribe(res => {
     this.categories = res;
    });
    console.log('hi');
  }
}
