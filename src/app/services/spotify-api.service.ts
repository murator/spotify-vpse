import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ErrorMessage } from '../models/error.message';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { VoiceRecognitionService } from './voice-recognition.service';
import { TracksRoot } from '../models/spotify.interfaces';


@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  errorMessage: Subject<ErrorMessage> = new Subject();
  currentSearchDataSubject = new Subject<any>();

  private apiUrl = environment.apiUrl;
  private currentSearchTerm;
  private httpOptions;

  constructor(private httpClient: HttpClient, private voiceRecognitionService: VoiceRecognitionService) {
    this.voiceRecognitionService.currentSearchTermSubject.subscribe((data) => {
      this.currentSearchTerm = data;
      this.searchSpotifyApi(this.currentSearchTerm).subscribe((data) => {
        this.currentSearchDataSubject.next(data);
      });
    })
  }

  ngOnInit(): void {
  }

  searchSpotifyApi(searchQuery: string): Observable<Object> {
    let access_token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'content-type': 'application/json',
          'Authorization': access_token
        }
      )
    };

    if (this.currentSearchTerm && this.currentSearchTerm.length > 0) searchQuery = this.currentSearchTerm;
    const searchType = 'track';
    if (searchType === 'track') {
      return this.executeQuery(searchQuery, searchType);
    }
    else if (searchType === 'album') {
      return this.executeQuery(searchQuery, searchType);
    }
    else if (searchType === 'artist') {
      return this.executeQuery(searchQuery, searchType);
    }
  }

  private executeQuery(searchQuery: string, searchType: string): Observable<Object> {
    if (!searchQuery) {
      throw new Error('no searchQuery in params');
    }
    searchType = 'track,artist,album';
    const searchString = this.apiUrl + 'query=' + searchQuery + '&type=' + searchType + '&limit=10';
    return this.httpClient.get<TracksRoot>(searchString, this.httpOptions)
      .map((data) => {
        this.currentSearchDataSubject.next(data);
        return data;
      })
      .catch((error: any) => {
        this.errorMessage.next(new ErrorMessage('ERROR.SEARCH_ERROR'));
        return throwError(error);
      });
  }
}
