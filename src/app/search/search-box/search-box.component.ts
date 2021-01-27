import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  searchTermSubscription: Subscription;

  constructor(
    public service: VoiceRecognitionService,
    private formBuilder: FormBuilder,
    private spotifyApiService: SpotifyApiService) {
    this.defaultForm();
  }

  ngOnInit(): void {
    this.service.init();
  }

  startService() {
    this.resetForm();
    this.service.start();
  }

  stopService() {
    this.service.stop();
    this.defaultForm();
  }

  defaultForm() {
    const searchCtrl = new FormControl(
      ' ',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(120)
      ]);

    this.searchForm = this.formBuilder.group({
      searchQuery: searchCtrl
    });
  }

  clearSearch() {
    this.searchForm.controls.searchQuery.setValue('');
  }

  resetForm() {
    this.searchForm.reset({});
  }

  onSubmit() {
    this.disabled = true;

    let searchQuery = '';
    if (this.service.text.length > 0) {
      searchQuery = this.service.text;
    } else {
      searchQuery = this.searchForm.value.searchQuery;
    }

    this.spotifyApiService.searchSpotifyApi(searchQuery).subscribe((result: any) => {
      this.disabled = false;
    }, () => {
      this.disabled = false;
    });
  }
}
