import { Component, Input, OnInit } from '@angular/core';
import { ArtistsRoot } from '../../../../models/spotify.interfaces';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  @Input()
  searchResults: ArtistsRoot = { artists: { items: [] } };

  constructor() { }

  ngOnInit(): void {
  }

}
