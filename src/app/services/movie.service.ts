import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Storage} from '@ionic/storage';


export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMoviesList(): Observable<any> {
    const url = environment.baseUrl + '/storage/movies';
    // const params = {
    //   grant_type: 'password',
    //   client_id: environment.client_id,
    //   client_secret: environment.client_secret,
    //   'username': username,
    //   'password': password,
    //   scope: '*'
    // };
    return this.http.get(url);
  }

  getMovieDetails() {}
}
