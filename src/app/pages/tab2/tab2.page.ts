import {Component, OnInit} from '@angular/core';
import {Local} from '../../models';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: './tab2.page.html',
    styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
    locals: Local[] = [
        {
            id: 0,
            name: 'Pharmacie Hanna',
            category: 'Pharmacy',
            description: 'Your best choice of a Localee'
        },
        {
            id: 1,
            name: 'Epicerie',
            category: 'Shop',
          description: 'Your best choice of a Localee'

        },
        {
            id: 2,
            name: 'Epicerie',
            category: 'Shop',
          description: 'Your best choice of a Localee'

        }
    ];
  isLoaded = true;

    constructor(public loadingController: LoadingController) {
      setTimeout( () => {
        this.isLoaded = false;
      }, 3000);
    }

    ngOnInit() {
      this.presentLoadingWithOptions();
    }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 3000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
