import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.signingWithGoogle();
  }

  logout() {
    this.authenticationService.logout();
  }

  get isTablet(): boolean {
    return window.screen.width <= 767 && window.screen.width > 360;
  }

  get isMobile(): boolean {
    return window.screen.width <= 360;
  }
}
