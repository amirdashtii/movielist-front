import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateNewListPage } from '../pages/create-new-list/create-new-list.page';
import { ApiService } from '../services/api.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-tab-list',
  templateUrl: 'tab-list.page.html',
  styleUrls: ['tab-list.page.scss'],
})
export class TabListPage implements OnInit {
  lists = [];

  opts = {
    slidesPerView: 2.4,
    // spaceBetween: 10,
    // freeMode: true
  };
  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CreateNewListPage,
    });
    modal.present();
  }
  ngOnInit() {
    this.loadLists();
  }
  async loadLists() {
    const loading = await this.loadingCtrl.create({
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
}
