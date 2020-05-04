import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Profile, Profession} from '../../models';
import {TwizoneService} from '../../services/twizone.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {
  item: Profile;
  professionName;
  profileId;
  professionId;
  Profession: Profession;
  constructor(private twizoneService: TwizoneService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      console.log(res);
      this.professionName = res.profession;
      this.profileId = res.id;
      this.twizoneService.getMarket().subscribe(res => {
        this.Profession = res.find(res => res.name == this.professionName);
        this.item = this.Profession.profiles.find(res => res.id == this.profileId);
        console.log(this.Profession);
        console.log(this.item);
      });
    });

  }

}
