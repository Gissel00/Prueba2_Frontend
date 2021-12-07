import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist,PlaylisteWithoutID } from '../models/playlist';
import { environment } from 'src/environments/environment';

const API= environment.urlBackend;
const ENDPOINT='playlists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

//CRUD
  getAllPlaylist(){
    return this.http.get<Playlist[]>(`${API}/${ENDPOINT}`)
  }
  //POST

  postPlaylist(playlist:PlaylisteWithoutID){
    return this.http.post(`${API}/${ENDPOINT}`,playlist);
  }

  //PUT

  putPlaylist(id:string,playlist:PlaylisteWithoutID ){
    return this.http.put(`${API}/${ENDPOINT}/${id}`,playlist);
  }

  //PATCH
  pathPlaylist(id:string,playlist:PlaylisteWithoutID ){
    return this.http.patch(`${API}/${ENDPOINT}/${id}`,playlist);
  }
  //DELETE

  deletePlaylist(id:string,){
    return this.http.delete(`${API}/${ENDPOINT}/${id}`);
  }
}