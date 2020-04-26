import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {Product, Category} from '../../model';
import {TwizoneService} from '../../sevices/twizone.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  Category: Category;
  filtered: Product[];
  SelectedCategories: Category[] = [];
  ids = [];
  categories: Category[] = [];
  currentCategoryId: number;
  pageName = '';
  constructor(private twizoneService: TwizoneService, private route: ActivatedRoute, private navCtrl: NavController,
              private router: Router) {
    // let id = this.navParams.get('id');
    // console.log(id);
    // let name = navParams.get('name');
    this.route.params.subscribe(res => {
      this.currentCategoryId = +res.id;
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
      this.SelectedCategories = res.filter(cat => {
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
      this.Category = this.SelectedCategories[0];
      this.filtered = this.Category.products;
    });

  }
  // filtered = this.Category.filter(item => item.category == '1');
  segmentChanged(e) {
    // console.log(e.target.value);
    this.twizoneService.getCategory(e.target.value).subscribe(res => {
      this.Category = res;
      this.filtered = res.products;
    });
  }
  Details(id) {
    this.navCtrl.navigateForward('details/' + this.Category.name + '/' + id);
  }

}
