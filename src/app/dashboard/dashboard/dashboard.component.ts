import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loginUri = '';
  authorized: boolean = false;

  private authorizationReturnUrl = '';
  private authEndpoint = environment.authEndpoint;
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;
  private scopes = environment.scopes.join(',');

  constructor(private router: Router) {
    // TODO: handle refresh after token expired (10mins)

    // SEE: http://dareid.github.io/chakram/example/spotify/
    // SEE: https://medium.com/@amorenogo/spotify-app-with-angular-ac2a92fb8bff

    this.loginUri = this.authEndpoint
      + 'client_id=' + this.clientId
      + '&redirect_uri=' + this.redirectUri
      + '&scope=' + this.scopes + '&response_type=token&show_dialog=true';
  }

  ngOnInit(): void {

    this.speakIntroduction();

    this.authorizationReturnUrl = this.router.url;
    if (this.authorizationReturnUrl.includes('access_token')) {
      let access_token = this.authorizationReturnUrl.split('#')[1];
      if (access_token) {
        this.setToken(access_token);
      } else {
        this.clearToken();
      }
    } else {
      this.clearToken();
    }
  }

  private setToken(access_token: string) {
    this.authorized = true;
    access_token = access_token.replace('access_token=', 'Bearer ');
    localStorage.setItem('token', access_token);
  }

  private clearToken() {
    this.authorized = false;
    localStorage.removeItem('token');
  }

  private speakIntroduction() {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = 'Click start to search for tracks, albums and artists on Spotify.';
    msg.lang = 'en-US';

    if ('speechSynthesis' in window) {
      // speechSynthesis.speak(msg);
    }
  }
}
