import { Component, Input, OnInit } from '@angular/core';
import { AlbumsRoot } from '../../../../models/spotify.interfaces';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input()
  searchResults: AlbumsRoot = { albums: { items: [] } };

  constructor() { }

  ngOnInit(): void {
  }

}
