import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { emailRegex } from 'src/assets/regex';
import {Profession} from '../../models';
import {ProfessionService} from '../../services/profession.service';
import {ProfileRegistrationDetails} from '../../models/profile-registration-details';
import {RegistrationDetails} from '../../models/registration-details';
import {RegistrationService} from '../../services/registration.service';

// status codes
const RESOURCE_CREATED = 201;
const UNAUTHORIZED = 401;

enum RegistrationType {
  VISITOR,
  CUSTOMER
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationDetails = new RegistrationDetails();
  profileRegistrationDetails = new ProfileRegistrationDetails();
  regType: RegistrationType = RegistrationType.VISITOR;
  professions: Profession[] = [];
  message: string;

  constructor(
    private registerService: RegistrationService,
    private professionService: ProfessionService,
    private translateService: TranslateService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.professionService.getAllProfessions().then((professions: Profession[]) => {
      this.professions = professions;
    });
  }

  onRegistrationClick() {
    if (this.regType === RegistrationType.VISITOR) {
      if (this.isValidVisitorRegistrationDeatails(this.registrationDetails)) {
        this.handleRegistration(this.regType);
      }
    } else if (this.regType === RegistrationType.CUSTOMER) {
      if (this.isValidProfileRegistrationDetails(this.profileRegistrationDetails)) {
        this.handleRegistration(this.regType);
      }
    }
  }

  private isValidVisitorRegistrationDeatails(details: RegistrationDetails) {
    this.displayMessage('clear');
    if (!details.username && !details.password) {
      this.displayMessage('registration.all-empty');
    } else if (!details.username) {
      this.displayMessage('registration.missing-email');
    } else if (!this.isValidEmailFormat(details.username)) {
      this.displayMessage('registration.invalid-email-format');
    } else if (!details.password) {
      this.displayMessage('registration.missing-password');
    } else if (!details.confirmationPassword) {
      this.displayMessage('registration.missing-confirmation-password');
    } else if (!this.isValidPassword(details.password)) {
      this.displayMessage('registration.short-password');
      this.registrationDetails.password = '';
    } else if (!this.isPasswordsMatch(details)) {
      this.displayMessage('registration.unmatched-passwords');
    } else {
      return true;
    }
  }

  private isValidProfileRegistrationDetails(details: ProfileRegistrationDetails) {
    this.displayMessage('clear');
    if (!details.username && !details.password) {
      this.displayMessage('registration.all-empty');
    } else if (!details.username) {
      this.displayMessage('registration.missing-email');
    } else if (!this.isValidEmailFormat(details.username)) {
      this.displayMessage('registration.invalid-email-format');
    } else if (!details.password) {
      this.displayMessage('registration.missing-password');
    } else if (!this.isValidPassword(details.password)) {
      this.displayMessage('registration.short-password');
      this.profileRegistrationDetails.password = '';
    } else if (!this.isPasswordsMatch(details)) {
      this.displayMessage('registration.unmatched-passwords');
    } else if (!details.firstName) {
      this.displayMessage('registration.missing-first-name');
    } else if (!details.lastName) {
      this.displayMessage('registration.missing-last-name');
    } else if (!details.phoneNumber) {
      this.displayMessage('registration.missing-phone-number');
    } else if (!details.professionId) {
      this.displayMessage('registration.missing-profession');
    } else if (!this.isValidPhoneNumber(details.phoneNumber)) {
      this.displayMessage('registration.invalid-phone-number');
    } else {
      return true;
    }
  }

  private displayMessage = (messageSource: string) => {
    try {
      this.translateService.get(messageSource).subscribe(
        (translatedMessage: string) => {
          this.message = translatedMessage;
        });
    } catch (err) {
      console.error('Translation error: ' + err.message);
    }
  }

  private isValidEmailFormat(email: string) {
    return emailRegex.test(email) ? true : false;
  }

  // basic check
  private isValidPassword(password: string) {
    return password.length >= 5 ? true : false;
  }

  private isPasswordsMatch(details: RegistrationDetails | ProfileRegistrationDetails) {
    return details.password === details.confirmationPassword ? true : false;
  }

  private isValidPhoneNumber(phoneNumber: string) {
    if (!this.isNumeric(phoneNumber)) {
      return;
    }
    if (phoneNumber.length < 8 || phoneNumber.length > 12) {
      return;
    }
    return true;
  }

  private isNumeric(num: any) {
    return !isNaN(num);
  }

  private handleRegistration = async (regType: RegistrationType) => {
    let details: RegistrationDetails | ProfileRegistrationDetails;
    if (regType === RegistrationType.VISITOR) {
      details = this.registrationDetails;
      details.role = regType;
    } else if (regType === RegistrationType.CUSTOMER) {
      details = this.profileRegistrationDetails;
      details.professionId = +details.professionId;
      details.role = regType;
    }
    this.registerService.register(details).subscribe({
      next: (status: any) => {
        if (status === RESOURCE_CREATED) {
          // success
          this.navCtrl.navigateBack('/');
        } else {
          console.error('Something went wrong, response is ' + status);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.status === UNAUTHORIZED) {
          this.displayMessage(err.error.message);
        } else {
          console.error(err);
        }
      }
    });
  }

  handleRegistrationTypeChange = () => {
    // before switching screen - remove error message if there was
    this.displayMessage('clear');
    this.regType === RegistrationType.VISITOR
      ? (this.regType = RegistrationType.CUSTOMER)
      : (this.regType = RegistrationType.VISITOR);
  }

  isVisitor(regType: RegistrationType) {
    return regType === RegistrationType.VISITOR ? true : false;
  }

}
