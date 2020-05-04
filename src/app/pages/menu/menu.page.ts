import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'Places',
      url: '/menu/first'
    },
    {
      title: 'Stub',
      url: '/menu/second'
    },
    {
      title: 'TwiZone',
      url: '/menu/home'
    },
    {
      title: 'Carte',
      url: '/menu/tabs'
    }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {

  }

}
