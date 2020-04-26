import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPageRoutingModule } from './listing-routing.module';

import { ListingPage } from './listing.page';
import {SubcategoryComponent} from './subcategory/subcategory.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPageRoutingModule,
  ],
  declarations: [ListingPage,
    SubcategoryComponent
  ]
})
export class ListingPageModule {}
