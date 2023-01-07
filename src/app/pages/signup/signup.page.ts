import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });
  }
  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.apiService.signUp(this.credentials.value).subscribe({
      next: async (v) => {
        await loading.dismiss();
        this.router.navigateByUrl('/', { replaceUrl: true });
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
