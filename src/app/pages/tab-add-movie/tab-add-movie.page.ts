import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-tab-add-movie',
  templateUrl: './tab-add-movie.page.html',
  styleUrls: ['./tab-add-movie.page.scss'],
})
export class TabAddMoviePage implements OnInit {
  lists = [];
  listId = undefined;
  imdbid = undefined;
  credentials: FormGroup;
  search = [];
  title: string;
  year: string;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.loadLists();
    this.credentials = this.fb.group({
      title: [''],
      year: [''],
    });
  }
  customAlertOptions = {
    header: ' ',
  };

  async handleChange(ev) {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.listId = ev.detail.value.list_id;
    this.imdbid = ev.detail.value.movie_imdbID;

    this.movieService.addMovieToList(ev.detail.value).subscribe({
      next: async (v) => {
        await loading.dismiss();
        console.log(v);
      },
      error: async (error) => {
        await loading.dismiss();
        console.log(error);
      },
    });
  }

  async loadLists() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getList().subscribe((res) => {
      loading.dismiss();
      this.lists.push(...res);
      console.log(res);
    });
  }

  async confirm() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.TabAddMovie(this.credentials.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.search.push(...res.Search);
        console.log(this.search);
        console.log();
      },
      error: async (error) => {
        await loading.dismiss();
        console.log(error);

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
