import { AlbumsRoot, ArtistsRoot, TracksRoot } from '../models/spotify.interfaces';

export type SearchType = TracksRoot | AlbumsRoot | ArtistsRoot;

export type SearchParams = {
  searchQuery: string,
  searchType: SearchType;
}