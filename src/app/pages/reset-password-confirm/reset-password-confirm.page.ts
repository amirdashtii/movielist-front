import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.page.html',
  styleUrls: ['./reset-password-confirm.page.scss'],
})
export class ResetPasswordConfirmPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      new_password: ['', Validators.required],
      re_new_password: ['', Validators.required],
    });
  }
  async reset_password_confirm() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    const uid = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    this.apiService
      .resetPasswordConfirm(this.credentials.value, uid, token)
      .subscribe({
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
