import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from './api.service';

declare module namespace {

  export interface Movie {
      id: number;
      title: string;
      year: string;
      actors: string[];
      director: string[];
      writer: string[];
      orginal_title?: any;
      rated: string;
      released: string;
      runtime: string;
      genre: string;
      plot: string;
      language: string;
      country: string;
      awards: string;
      poster: string;
      metascore: string;
      imdbrating: number;
      imdbid: string;
      type: string;
  }

  export interface Result {
      id: number;
      movie: Movie;
  }

  export interface RootObject {
      count: number;
      next: string;
      previous?: any;
      results: Result[];
  }

}


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = environment.baseUrl;

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getList(): Observable<any> {
    const url = this.url + '/storage/lists/';
    return this.http.get(url);
  }

  getListDetails(id: string) {
    const url = this.url + `/storage/lists/${id}/`;
    return this.http.get(url);
  }
  getListItemDetails(id: string, page = 1):Observable<namespace.RootObject> {
    const url = this.url + `/storage/lists/${id}/items/?page=${page}`;
    return this.http.get<namespace.RootObject>(url);
  }
  createNweList(credentials: {name, description}) {
    return this.http.post(`${this.url}/storage/lists/`, credentials);

  }
}
