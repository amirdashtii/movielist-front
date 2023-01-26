import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from './api.service';

declare module namespace1 {
  export interface Search {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }

  export interface RootObject {
    Search: Search[];
    totalResults: string;
    Response: string;
  }
}

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
  movie_id: any;

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getList(): Observable<any> {
    const url = this.url + '/storage/lists/';
    return this.http.get(url);
  }

  getListDetails(id: string) {
    const url = this.url + `/storage/lists/${id}/`;
    return this.http.get(url);
  }
  getListItemDetails(id: string, page = 1): Observable<namespace.RootObject> {
    const url = this.url + `/storage/lists/${id}/items/?page=${page}`;
    return this.http.get<namespace.RootObject>(url);
  }
  getMovieDetails(id: string): Observable<namespace.RootObject> {
    const url = this.url + `/storage/movies/${id}/`;
    return this.http.get<namespace.RootObject>(url);
  }
  createNweList(credentials: { name; description }) {
    return this.http.post(`${this.url}/storage/lists/`, credentials);
  }
  getAllMovie(page = 1, credentials): Observable<namespace.RootObject> {
    let url = this.url + `/storage/movies/?page=${page}`;
    if (credentials.sortBy !== null) {
      url += `&ordering=${credentials.sortBy}`;
    }
    if (credentials.loweryears !== null) {
      url += `&year__gte=${credentials.loweryears}`;
    }
    if (credentials.upperyears !== null) {
      url += `&year__lte=${credentials.upperyears}`;
    }
    if (credentials.actor !== null) {
      url += `&actors__full_name=${credentials.actor}`;
    }
    if (credentials.director !== null) {
      url += `&director__full_name=${credentials.director}`;
    }
    if (credentials.writer !== null) {
      url += `&writer__full_name=${credentials.writer}`;
    }
    return this.http.get<namespace.RootObject>(url);
  }
  TabAddMovie(credentials: { title; year }) {
    return this.http.post<namespace1.RootObject>(
      `${this.url}/storage/search-movie/`,
      credentials
    );
  }
  addMovieToList(ev: { imdbid; list_id }): Observable<any> {
    return this.http.post(`${this.url}/storage/add-movie/`, ev).pipe(
      switchMap((movie_id: { movei_id }) => {
        return this.http.post(
          `${this.url}/storage/lists/${ev.list_id}/items/`,
          movie_id
        );
      })
    );
  }
}
