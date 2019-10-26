import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab1Page } from './tab1.page';
import {BookmarksComponent} from '../places/bookmarks/bookmarks.component';
import {PlaceDetailComponent} from '../places/place-detail/place-detail.component';
import {PlacesPageModule} from '../places/places.module';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  },
  {
    path: ':placeId',
    component: PlaceDetailComponent
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      PlacesPageModule,
      RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page, PlaceDetailComponent, BookmarksComponent]
})
export class Tab1PageModule {}
