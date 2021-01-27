import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ErrorMessage } from '../models/error.message';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { VoiceRecognitionService } from './voice-recognition.service';
import { AlbumsRoot, ArtistsRoot, TracksRoot } from '../models/spotify.interfaces';
import { catchError, map } from 'rxjs/operators';

type SearchParams = {
  searchQuery: string,
  searchType: string
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  errorMessage: Subject<ErrorMessage> = new Subject();
  currentSearchDataSubject = new Subject<any>();

  private apiUrl = environment.apiUrl;
  private currentSearchParams;
  private httpOptions;

  constructor(private httpClient: HttpClient, private voiceRecognitionService: VoiceRecognitionService) {
    this.voiceRecognitionService.currentSearchTermSubject.subscribe((searchParams) => {
      this.currentSearchParams = searchParams;
      this.searchSpotifyApi(this.currentSearchParams).subscribe((data) => {
        this.currentSearchDataSubject.next(data);
      });
    })
  }

  ngOnInit(): void {
  }

  searchSpotifyApi(searchParams: SearchParams): Observable<Object> {
    if (!searchParams) {
      throw new Error('no searchQuery in params');
    }

    let access_token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'content-type': 'application/json',
          'Authorization': access_token
        }
      )
    };

    switch (searchParams.searchType) {
      case 'track':
        return this.searchTracks(searchParams.searchQuery);
        break;
      case 'album':
        return this.searchAlbums(searchParams.searchQuery);
        break;
      case 'artist':
        return this.searchArtists(searchParams.searchQuery);
        break;
    }
  }

  private searchTracks(searchQuery: string): Observable<Object> {
    const searchString = this.apiUrl + 'query=' + searchQuery + '&type=track&limit=10';
    return this.httpClient.get<TracksRoot>(searchString, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(result => {
          this.currentSearchDataSubject.next(result);
          return result;
        })
      );
  }

  private searchAlbums(searchQuery: string): Observable<Object> {
    const searchString = this.apiUrl + 'query=' + searchQuery + '&type=album&limit=10';
    return this.httpClient.get<AlbumsRoot>(searchString, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(result => {
          this.currentSearchDataSubject.next(result);
          return result;
        })
      );
  }

  private searchArtists(searchQuery: string): Observable<Object> {
    const searchString = this.apiUrl + 'query=' + searchQuery + '&type=artist&limit=10';
    return this.httpClient.get<ArtistsRoot>(searchString, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        map(result => {
          this.currentSearchDataSubject.next(result);
          return result;
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
