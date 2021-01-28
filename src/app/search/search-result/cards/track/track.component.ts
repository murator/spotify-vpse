import { Component, OnInit, Input } from '@angular/core';
import { TracksRoot } from '../../../../models/spotify.interfaces';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input()
  searchResults: TracksRoot = { tracks: { items: [] } };

  constructor() { }

  ngOnInit(): void {
  }

}
