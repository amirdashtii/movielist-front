import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.page.html',
  styleUrls: ['./create-new-list.page.scss'],
})
export class CreateNewListPage implements OnInit {
  credentials: FormGroup;

  name: string;
  description: string;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  async confirm() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.createNweList(this.credentials.value).subscribe({
      next: async (_) => {
        await loading.dismiss();
        this.modalCtrl.dismiss(null, 'confirm');
      },
      error: async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'fail',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
