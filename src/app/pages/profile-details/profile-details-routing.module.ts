import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDetailsPage } from './profile-details.page';

const routes: Routes = [
  {
    path: ':profession/:id',
    component: ProfileDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileDetailsPageRoutingModule { }
