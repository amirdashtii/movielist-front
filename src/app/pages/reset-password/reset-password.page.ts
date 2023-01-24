import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', Validators.email],
    });
  }
  async reset_password() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.apiService.resetPassword(this.credentials.value).subscribe({
      next: async (v) => {
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      error: async (error) => {
        await loading.dismiss();

        for (const e in error.error) {
          const toast = await this.toastController.create({
            message: error.error[e],
            duration: 2000,
            position: 'top',
          });
          await toast.present();
        }
      },
    });
  }
}
