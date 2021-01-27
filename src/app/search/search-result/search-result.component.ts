import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { TracksRoot } from 'src/app/models/spotify.interfaces';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResultsSubscription: Subscription;
  searchResults: TracksRoot;

  constructor(private spotifyApiService: SpotifyApiService) {
    this.searchResultsSubscription =
      this.spotifyApiService.currentSearchDataSubject.subscribe((data: TracksRoot) => {
        this.searchResults = data;
      });
  }

  ngOnInit(): void {
  }

}
