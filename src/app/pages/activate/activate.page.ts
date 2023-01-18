import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.page.html',
  styleUrls: ['./activate.page.scss'],
})
export class ActivatePage implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  async verify_account() {
    const loading = await this.loadingController.create();
    await loading.present();

    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    this.apiService.verify(uid,token).subscribe({
      next: async (v) => {
        await loading.dismiss();
        console.log(v)
        const alert = await this.alertController.create({
          header: 'successful',
          message: 'Your account has been created and is ready to use!',
          buttons: ['OK'],
        });
    
        await alert.present();
      
        this.router.navigateByUrl('/', { replaceUrl: true });
      },
      error: async (error) => {
        await loading.dismiss();

        const alert = await this.alertController.create({
          header: 'error',
          message: 'error',
          buttons: ['OK'],
        });
    
        await alert.present();
        

      
      },
    })

    // verify(uid, token);
    // setVerified(true);
  }
}
