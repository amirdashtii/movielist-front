import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  list = null;
  listitems = [];
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getListDetails(id).subscribe((res) => {
      this.list = res;
      console.log('list', this.list);
      this.loadList();
    });
  }
  async loadList(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getListItemDetails(id, this.currentPage).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.listitems.push(...res.results);
        console.log('------: ', res);
        event?.target.complete();
        if (event) {
          console.log('next', res.next);
          event.target.disabled = res.next === null;
        }
      },
      error: async (error) => {
        await loading.dismiss();
        event.target.disabled = error.error.detail === 'Invalid page.';
      },
    });
  }
  loadMore(event: any) {
    this.currentPage++;
    this.loadList(event);
  }
}
