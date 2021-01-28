import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { SearchType } from 'src/app/models/search.interfaces';
import { TracksRoot } from 'src/app/models/spotify.interfaces';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResultsSubscription: Subscription;
  searchResults: SearchType;

  constructor(private spotifyApiService: SpotifyApiService) {
    this.searchResultsSubscription =
      this.spotifyApiService.currentSearchDataSubject.subscribe((data: SearchType) => {
        this.searchResults = data;
      });
  }

  ngOnInit(): void {
  }

}
