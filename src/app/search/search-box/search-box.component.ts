import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  disabled = false;
  searchForm: FormGroup;
  radioForm: FormGroup;
  error = '';
  searchTypes = ['track', 'album', 'artist'];
  searchParams = {
    searchQuery: '',
    searchType: ''
  }

  searchTermSubscription: Subscription;

  constructor(
    public service: VoiceRecognitionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spotifyApiService: SpotifyApiService) {
    this.defaultForm();
  }

  ngOnInit(): void {
    this.service.init();
    this.defaultForm();
  }

  startService() {
    this.updateForm();
    this.service.start();
  }

  stopService() {
    this.service.stop();
    this.defaultForm();
  }

  defaultForm() {
    const searchCtrl = new FormControl('', Validators.required);
    const searchType = new FormControl(this.searchTypes[0], Validators.required);

    this.searchForm = this.formBuilder.group({
      searchQuery: searchCtrl,
      searchType: searchType
    });
  }

  clearSearch() {
    this.searchForm.controls.searchQuery.setValue('');
  }

  resetForm() {
    this.searchForm.reset({});
  }

  updateForm() {
    this.searchParams = {
      searchQuery: this.service.text,
      searchType: this.searchForm.value.searchType
    }
  }

  onSubmit() {
    this.disabled = true;

    if (this.service.text.length > 0) {
      this.searchParams = {
        searchQuery: this.service.text,
        searchType: this.searchForm.value.searchType
      }
    } else {
      this.searchParams = {
        searchQuery: this.searchForm.value.searchQuery,
        searchType: this.searchForm.value.searchType
      }
    }

    this.spotifyApiService.searchSpotifyApi(this.searchParams)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
      .subscribe(
        res => { },
        err => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['.'])
          }
          if (err.status === 400) {
          }
        },
        () => this.disabled = false
      );
  }
}
