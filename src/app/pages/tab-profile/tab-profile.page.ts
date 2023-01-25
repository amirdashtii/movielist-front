import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tab-profile',
  templateUrl: 'tab-profile.page.html',
  styleUrls: ['tab-profile.page.scss'],
})
export class TabProfilePage {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private loadingController: LoadingController
  ) {}
  async logout() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.apiService.logout().subscribe({
      next: async (v) => {
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
    });
  }
}
