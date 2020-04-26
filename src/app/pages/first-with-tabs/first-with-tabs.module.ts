import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FirstWithTabsPage } from './first-with-tabs.page';

const routes: Routes = [
  {
    path: 'places',
    component: FirstWithTabsPage,
    children: [
      {
        path: 'tours',
        loadChildren: () => import('../tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tours/details',
        loadChildren: () => import('../details/details.module').then( m => m.DetailsPageModule)
      },
      {
        path: 'local',
        loadChildren: () => import('../tab2/tab2.module').then( m => m.Tab2PageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'places/tours',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FirstWithTabsPage]
})
export class FirstWithTabsPageModule {}
