import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  LoadingController,
  RangeCustomEvent,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { RangeValue } from '@ionic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface rValue {
  lower: number;
  upper: number;
}

@Component({
  selector: 'app-tab-search',
  templateUrl: 'tab-search.page.html',
  styleUrls: ['tab-search.page.scss'],
})
export class TabSearchPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  credentials: FormGroup;
  lastEmittedValue: RangeValue;
  lowerYears = null;
  upperYears = null;
  isFiltersModalOpen = false;
  isSortModalOpen = false;
  movies = [];
  currentPage = 1;
  ress = '';

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private loadingController: LoadingController
  ) {}
  ngOnInit() {
    this.allMovie();
    this.credentials = this.fb.group({
      loweryears: [null, Validators.required],
      upperyears: [null, Validators.required],
      actor: [null, Validators.required],
      director: [null, Validators.required],
      writer: [null, Validators.required],
      sortBy: [null, Validators.required],
    });
  }
  async allMovie() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.movieService
      .getAllMovie(this.currentPage, this.credentials.value)
      .subscribe({
        next: async (res) => {
          await loading.dismiss();
          this.ress = res.next;
          this.movies.push(...res.results);
        },
        error: async (error) => {
          await loading.dismiss();
        },
      });
  }
  filters() {
    this.movies = [];
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;

    this.allMovie();
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
  resetSort() {
    this.credentials.value.sortBy = null;
  }
  loadMore(event: any) {
    setTimeout(() => {
      this.currentPage++;
      event.target.complete();
      if (this.ress === null) {
        event.target.disabled = true;
      } else {
        this.allMovie();
      }
    });
  }

  setOpenSort(isOpen: boolean) {
    this.isSortModalOpen = isOpen;
  }
  setOpenFilters(isOpen: boolean) {
    this.isFiltersModalOpen = isOpen;
  }
  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value as rValue;
    this.lowerYears = this.lastEmittedValue.lower;
    this.upperYears = this.lastEmittedValue.upper;
  }
}
