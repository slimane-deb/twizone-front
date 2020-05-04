import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {Profile, Profession} from '../../models';
import {TwizoneService} from '../../services/twizone.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  Profession: Profession;
  filtered: Profile[];
  SelectedProfessions: Profession[] = [];
  ids = [];
  categories: Profession[] = [];
  currentProfessionId: number;
  pageName = '';
  constructor(private twizoneService: TwizoneService, private route: ActivatedRoute, private navCtrl: NavController,
              private router: Router) {
    // let id = this.navParams.get('id');
    // console.log(id);
    // let name = navParams.get('name');
    this.route.params.subscribe(res => {
      this.currentProfessionId = +res.id;
    });
    this.route.queryParamMap.subscribe(res => {
      res.getAll('q').forEach(str => {
        this.ids.push(+str);
      });
      console.log(this.ids);
    });
  }

  ngOnInit() {

    this.twizoneService.getMarket().subscribe(res => {
      this.categories = res;
      this.SelectedProfessions = res.filter(cat => {
        if (this.ids.indexOf(+cat.id) > -1) {
          let convertedName = cat.name.slice(0, 1).toUpperCase();

          convertedName += cat.name.slice(1).toLowerCase();
          if (this.pageName.length > 1) {
            this.pageName += '&' + convertedName;
          } else {
            this.pageName = convertedName;
          }
          console.log(cat);
          return cat;
        }
      });
      this.Profession = this.SelectedProfessions[0];
      this.filtered = this.Profession.profiles;
    });

  }
  // filtered = this.Profession.filter(item => item.profession == '1');
  segmentChanged(e) {
    // console.log(e.target.value);
    this.twizoneService.getProfession(e.target.value).subscribe(res => {
      this.Profession = res;
      this.filtered = res.profiles;
    });
  }
  Details(id) {
    this.navCtrl.navigateForward('details/' + this.Profession.name + '/' + id);
  }

}
