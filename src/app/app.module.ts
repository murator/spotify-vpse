import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SpotifyApiService } from './services/spotify-api.service';
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TrackComponent } from './search/search-result/cards/track/track.component';
import { AlbumComponent } from './search/search-result/cards/album/album.component';
import { ArtistComponent } from './search/search-result/cards/artist/artist.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchBoxComponent,
    SearchResultComponent,
    TrackComponent,
    AlbumComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [SpotifyApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
