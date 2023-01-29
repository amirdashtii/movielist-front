import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  LoadingController,
  RangeCustomEvent,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { RangeValue } from '@ionic/core';

export interface rValue {
  lower: number;
  upper: number;
}
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  credentials: FormGroup;
  lastEmittedValue: RangeValue;
  lowerYears = null;
  upperYears = null;
  list = null;
  listitems = [];
  currentPage = 1;
  isSearchModalOpen = false;
  isFiltersModalOpen = false;
  isSortModalOpen = false;
  ress = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
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
    this.credentials = this.fb.group({
      loweryears: [null, Validators.required],
      upperyears: [null, Validators.required],
      actor: [null, Validators.required],
      director: [null, Validators.required],
      writer: [null, Validators.required],
      sortBy: [null, Validators.required],
      search: [null, Validators.required],
    });
  }
  async loadList(event?: InfiniteScrollCustomEvent) {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.movieService
      .getListItemDetails(id, this.currentPage, this.credentials.value)
      .subscribe({
        next: async (res) => {
          await loading.dismiss();
          this.ress = res.next;
          this.listitems.push(...res.results);
          console.log('------: ', res);
        },
        error: async (error) => {
          await loading.dismiss();
        },
      });
  }
  loadMore(event: any) {
    setTimeout(() => {
      this.currentPage++;
      event.target.complete();
      if (this.ress === null) {
        event.target.disabled = true;
      } else {
        this.loadList();
      }
    });
  }

  filters() {
    this.listitems = [];
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;
    this.loadList();
  }
  setOpenFilters(isOpen: boolean) {
    this.isFiltersModalOpen = isOpen;
  }
  resetFilters() {
    this.lowerYears = null;
    this.upperYears = null;
    this.credentials.value.loweryears = null;
    this.credentials.value.upperyears = null;
    this.credentials.value.actor = null;
    this.credentials.value.director = null;
    this.credentials.value.writer = null;
  }
  setOpenSearch(isOpen: boolean) {
    this.isSearchModalOpen = isOpen;
  }
  resetSearch() {
    this.credentials.value.search = null;
  }
  setOpenSort(isOpen: boolean) {
    this.isSortModalOpen = isOpen;
  }
  resetSort() {
    this.credentials.value.sortBy = null;
  }
  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value as rValue;
    this.lowerYears = this.lastEmittedValue.lower;
    this.upperYears = this.lastEmittedValue.upper;
  }
}
