import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab-profile',
  templateUrl: 'tab-profile.page.html',
  styleUrls: ['tab-profile.page.scss'],
})
export class TabProfilePage {
  constructor(private apiService: ApiService) { }
  logout() {
    this.apiService.logout();
  }
}
