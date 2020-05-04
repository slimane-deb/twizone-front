import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Map, tileLayer, marker, icon, Marker, LocationEvent, LatLng, LocateOptions, TileLayerOptions, circle } from 'leaflet';
import { UserService } from 'src/app/services/user.service';
import { Profile } from 'src/app/models/profile';
import { Position } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/enums';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import {Profession} from '../../../models';

// layer
const MAP_TILE_LAYER = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
const MAP_TILE_ATTRIBUTION = '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>';
const COORDINATES_OF_ALGIERS: LatLng = new LatLng(36.75, 3.06);
const DEFAULT_ZOOM_LEVEL = 12;
// icons
const AVAILABLE_ICON_PATH = 'assets/icon/available.png';
const UNAVAILABLE_ICON_PATH = 'assets/icon/unavailable.png';
// map
let map: Map;
// storage for logged in user's marker(s)
const markers: Marker[] = [];
// storage for profiles' markers
const profileMarkers: Marker[] = [];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterContentInit {

  currentUser: User;
  currentPosition: Position;
  professions: Profession[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService,
    private professionService: ProfessionService,
    private translateService: TranslateService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    // display profiles on map
    this.addProfilesToMap();
  }

  ngOnInit() {
    // auth user
    const user = this.authService.getCurrentUser();
    const userId = +user.id;
    if (userId !== 0) {
      this.userService.getUserById(userId).subscribe({
        next: (usr: User) => {
          this.currentUser = usr;
        },
        error: (err: any) => {
          console.error(err.message);
        }
      });
    } else {
      // TODO
      // if userId equals 0 then user is not a logged in user but a visitor
    }
    this.professionService.getAllProfessions().then((professions: Profession[]) => {
      this.professions = professions;
    });
    // MAP INITIALIZATION / currently the map's starting postion points to Algiers
    map = new Map('map').setView(COORDINATES_OF_ALGIERS, DEFAULT_ZOOM_LEVEL);
    const tileLayerOptions: TileLayerOptions = {
      attribution: MAP_TILE_ATTRIBUTION,
      minZoom: 1,
      maxZoom: 19
    };
    tileLayer(MAP_TILE_LAYER, tileLayerOptions)
      .addTo(map);

    const locateOptions: LocateOptions = {
      // If true, starts continuous watching of location changes (instead of detecting it once)
      watch: true,
      // if true, reset location completely if position changes (e.g. zoom again)
      setView: false,
      maxZoom: 16,
      timeout: 10000
    };
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method
    map.locate(locateOptions);
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);

    // when user comes from 'tab1' - search page
    this.route.queryParams.subscribe(params => {
      const professionId = params.professionId;
      if (professionId) {
        this.addProfilesToMap();
      }
    });
    // TODO TEMP SOLUTION for getting data from db in every minutes
    setInterval(() => {
      this.addProfilesToMap();
    }, 60000);
  }

  onLocationFound = (location: LocationEvent) => {
    // remove previous marker
    if (markers.length > 0) {
      map.removeLayer(markers.pop());
    }
    // position icon
    const myMarker = marker(location.latlng, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -40],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      })
    })
      .addTo(map)
      .on('click', () => {
        this.onLocationClick(myMarker, location.latlng);
      });
    markers.push(myMarker);
    // use for relocation
    this.currentPosition = this.getCurrentUserPosition(location);
  }

  private getCurrentUserPosition = (location: LocationEvent) => {
    return { latitude: location.latlng.lat, longitude: location.latlng.lng, timestamp: new Date() };
  }

  onLocationClick(myMarker: Marker, latlng: LatLng, profile?: Profile) {
    if (myMarker) {
      myMarker.off('click');
      // zoom
      myMarker.on('click', () => {
        map.setView(latlng, 17);
      });
      if (!profile) {
        myMarker
          // .bindPopup(`<b>${'name'}</b><br>Your position`)
          .bindPopup(this.buildHTMLPopupForVisitor())
          .openPopup();
      } else {
        myMarker
          .bindPopup(this.buildHTMLPopupForProfile(profile))
          .openPopup();
      }
    }
  }

  private buildHTMLPopupForVisitor() {
    const mainDivEl = document.createElement('div');
    const bTextEl = document.createElement('b');
    this.addTextToHTMLElement(bTextEl, 'popup.your-position');
    mainDivEl.appendChild(bTextEl);
    return mainDivEl;
  }

  private buildHTMLPopupForProfile(profile: Profile) {
    const mainDivEl = document.createElement('div');
    const topDivEl = document.createElement('div');
    const statusImgEl = document.createElement('img');
    statusImgEl.id = 'status-img';
    statusImgEl.width = 10;
    statusImgEl.height = 10;
    statusImgEl.src = `assets/icon/${profile.status === Status.AVAILABLE ? 'online' : 'offline'}.png`;
    const nameBtextEl = document.createElement('b');
    nameBtextEl.textContent = ` ${profile.firstName + ' ' + profile.lastName}`;
    const professionPtextEl = document.createElement('p');
    professionPtextEl.style.margin = '0';
    professionPtextEl.textContent = `${this.getProfessionFromArrayById(this.professions, profile.professionId)[0].name}`;
    const phonePtextEl = document.createElement('p');
    this.addTextToHTMLElement(phonePtextEl, 'popup.phone');
    const phoneSpanEl = document.createElement('span');
    const phoneBtextEl = document.createElement('b');
    phoneBtextEl.textContent = profile.phoneNumber;
    phoneSpanEl.appendChild(phoneBtextEl);
    phonePtextEl.appendChild(phoneSpanEl);
    // topDivEl -> status icon + name + profession
    topDivEl.appendChild(statusImgEl);
    topDivEl.appendChild(nameBtextEl);
    topDivEl.appendChild(professionPtextEl);
    mainDivEl.appendChild(topDivEl);
    // mainDivEl -> phone number + avaiable from date
    mainDivEl.appendChild(phonePtextEl);
    if (profile.status === Status.NOT_AVAILABLE && profile.availableFrom) {
      const availablePtextEl = document.createElement('p');
      this.addTextToHTMLElement(availablePtextEl, 'popup.available-from');
      const availableSpanEl = document.createElement('span');
      availableSpanEl.textContent = this.getFormattedDate(new Date(profile.availableFrom));
      availablePtextEl.appendChild(availableSpanEl);
      mainDivEl.appendChild(availablePtextEl);
    }
    return mainDivEl;
  }

  /**
   *
   * @param htmlElement HTMLElement
   * @param i18nTextSource string
   * @description get text content via i18n's translateService and
   * attach to the html element
   */
  private addTextToHTMLElement(htmlElement: HTMLElement, i18nTextSource: string) {
    try {
      this.translateService.get(i18nTextSource).subscribe(
        (translatedText: string) => {
          htmlElement.textContent = translatedText;
        }
      );
    } catch (err) {
      console.error('Translation error: ' + err.message);
    }
  }

  private getProfessionFromArrayById = (professions: Profession[], professionId: number) => {
    if (professions.length > 0) {
      return professions.filter((profession: Profession) => {
        return profession.id === professionId;
      });
    }
  }

  /**
   *
   * @param dt Date
   * @description convert Date to a formatted string -> output format: yyyy-mm-dd HH:mm
   * @returns string
   */
  private getFormattedDate(dt: Date) {
    return `${
      dt.getFullYear().toString().padStart(4, '0')}-${
      (dt.getMonth() + 1).toString().padStart(2, '0')}-${
      dt.getDate().toString().padStart(2, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}`;
  }

  onLocationError(e: any) {
    alert(e.message);
    map.on('locationfound', this.onLocationFound);
  }

  // TODO REFACTOR
  addProfilesToMap = () => {
    // remove previous (profile's) marker
    profileMarkers.map((singleMarker: Marker) => {
      map.removeLayer(singleMarker);
    });
    // if there is a selected profession (in search)
    // then get only profiles by profession
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        const professionId = params.professionId;
        if (professionId) {
          this.profileService.getProfilesByProfession(professionId).subscribe({
            next: (profilesArray: Profile[]) => {
              profilesArray.map((profile: Profile) => {
                // rewrite 'position' data member with its parsed value
                profile.position = this.parseProfilePositionToJSON(profile.position);
                this.addLocationIconToMap(profile);
              });
            },
            error: (err: HttpErrorResponse) => {
              console.error(err.message);
            }
          });
        } else {
          this.profileService.getProfiles().subscribe({
            next: (profilesArray: Profile[]) => {
              profilesArray.map((profile: Profile) => {
                profile.position = this.parseProfilePositionToJSON(profile.position);
                this.addLocationIconToMap(profile);
              });
            },
            error: (err: HttpErrorResponse) => {
              console.error(err.message);
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      },
      complete: () => {
        // complete
        console.log('Profiles added');
      }
    });
  }

  parseProfilePositionToJSON(profilePosition: string | Position) {
    // 'position' data member comes from the database as a string
    if (typeof profilePosition === 'string') {
      const position: Position = JSON.parse(profilePosition);
      return position;
    }
  }

  addLocationIconToMap = (profile: Profile) => {
    if (typeof profile.position !== 'string' && profile.position.latitude && profile.position.longitude) {
      const latlng: LatLng = new LatLng(profile.position.latitude, profile.position.longitude);
      const mrkr = marker(latlng, {
        icon: icon({
          iconSize: [31, 31],
          iconAnchor: [13, 41],
          popupAnchor: [0, -40],
          iconUrl: profile.status === Status.AVAILABLE ? AVAILABLE_ICON_PATH : UNAVAILABLE_ICON_PATH,
        }),
        opacity: profile.status === Status.AVAILABLE ? 1 : 0.8
      })
        .addTo(map)
        .on('click', () => {
          this.onLocationClick(mrkr, latlng, profile);
        });
      // store markers
      profileMarkers.push(mrkr);
    } else {
      console.error('"position" data is missing');
    }
  }

  onSearchInputClick() {
    this.navCtrl.navigateForward('/visitor/tabs/tab1');
  }

  // TODO check on device
  relocate = (currentPosition: Position) => {
    map.flyTo(new LatLng(currentPosition.latitude, currentPosition.longitude), 16);
  }

  ngAfterContentInit() {
  }

}
