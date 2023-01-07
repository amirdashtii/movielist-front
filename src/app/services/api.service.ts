import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Preferences } from '@capacitor/preferences'; // import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
// const { Storage } = Plugins;

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // Load accessToken on startup
  async loadToken() {
    const token = await Preferences.get({ key: ACCESS_TOKEN_KEY });
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // Get our secret protected data
  getSecretData() {
    return this.http.get(`${this.url}/users/secret`);
  }

  // Create new user
  signUp(credentials: {username, email, password, re_password}): Observable<any> {
    return this.http.post(`${this.url}/auth/users/`, credentials);
  }

  // Sign in a user and store access and refres token
  login(credentials: {username, password}): Observable<any> {
    return this.http.post(`${this.url}/auth/jwt/create/`, credentials).pipe(
      switchMap((tokens: {access, refresh}) => {
        this.currentAccessToken = tokens.access;
        const storeAccess = Preferences.set({key: ACCESS_TOKEN_KEY, value: tokens.access});
        const storeRefresh = Preferences.set({key: REFRESH_TOKEN_KEY, value: tokens.refresh});
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }


  // Potentially perform a logout operation inside your API
  // or simply remove all local tokens and navigate to login
  logout() {
    this.currentAccessToken = null;
    // Remove all stored tokens
    const deleteAccess = Preferences.remove({ key: ACCESS_TOKEN_KEY });
    const deleteRefresh = Preferences.remove({ key: REFRESH_TOKEN_KEY });
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/', { replaceUrl: true });
    return from(Promise.all([deleteAccess, deleteRefresh]));
  }

  // Load the refresh token from Preferences
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    const refresh = from(Preferences.get({ key: REFRESH_TOKEN_KEY }));
    return refresh.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
          return this.http.post(`${this.url}/auth/jwt/refresh/`,refresh, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(access) {
    this.currentAccessToken = access;
    return from(Preferences.set({ key: ACCESS_TOKEN_KEY, value: access }));
  }
}