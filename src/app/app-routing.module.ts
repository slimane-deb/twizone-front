import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule) },
  { path: 'first-with-tabs', loadChildren: () => import ('./pages/first-with-tabs/first-with-tabs.module')
        .then(m => m.FirstWithTabsPageModule) },
  { path: 'second', loadChildren: () => import ('./pages/second/second.module').then(m => m.SecondPageModule) },
  { path: 'places',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/places/places.module').then( m => m.PlacesPageModule)
      }
    ]
  },
  { path: 'local', loadChildren: () => import('./pages/tab2/tab2.module').then( m => m.Tab2PageModule) },
  { path: 'details', loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule) },
  { path: 'intro', loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule) },
  { path: 'listing', loadChildren: () => import('./pages/listing/listing.module').then( m => m.ListingPageModule) },
  { path: 'details', loadChildren: () => import('./pages/product-details/product-details.module')
        .then( m => m.ProductDetailsPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
