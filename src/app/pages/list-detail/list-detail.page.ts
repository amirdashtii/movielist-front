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
  list = null;
  listitems = [];
  years = [];
  currentPage = 1;
  ress = '';
  isFiltersModalOpen = false;
  iconName = 'arrow-down-outline';
  dateAddedIcon = this.iconName;
  titleIcon = 'none';
  yearIcon = 'none';
  imdbratingIcon = 'none';
  metascoreIcon = 'none';
  runtimeIcon = 'none';
  sort_by = 'Date Added';
  lowerYears = null;
  upperYears = null;

  lastEmittedValue: RangeValue;

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
      for (var item of this.list.items) {
        this.years.push(item.movie.year);
      }
      this.years.sort();
      this.lowerYears = this.years[0];
      this.upperYears = this.years.slice(-1);
      this.loadList();
    });
    this.credentials = this.fb.group({
      sortBy: ['-movie__added_at', Validators.required],
      loweryears: [null, Validators.required],
      upperyears: [null, Validators.required],
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
          console.log('listitems: ', res);
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

  refresh() {
    this.listitems = [];
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;
    this.loadList();
  }
  changeSortdir(i) {
    if (i === this.credentials.value.sortBy) {
      if (this.iconName === 'arrow-down-outline') {
        this.iconName = 'arrow-up-outline';
      } else this.iconName = 'arrow-down-outline';

      if (i === 'movie__added_at') {
        this.dateAddedIcon = this.iconName;
      } else if (i === 'movie__title') {
        this.titleIcon = this.iconName;
      } else if (i === 'movie__year') {
        this.yearIcon = this.iconName;
      } else if (i === 'movie__imdbrating') {
        this.imdbratingIcon = this.iconName;
      } else if (i === 'movie__metascore') {
        this.metascoreIcon = this.iconName;
      } else if (i === 'movie__runtime') {
        this.runtimeIcon = this.iconName;
      }
    }
  }
  handleChange(e) {
    this.iconName = 'arrow-down-outline';
    this.dateAddedIcon = 'none';
    this.titleIcon = 'none';
    this.yearIcon = 'none';
    this.imdbratingIcon = 'none';
    this.metascoreIcon = 'none';
    this.runtimeIcon = 'none';
    if (e.detail.value === 'movie__added_at') {
      this.sort_by = 'Date Added';
      this.dateAddedIcon = this.iconName;
    } else if (e.detail.value === 'movie__title') {
      this.sort_by = 'Title';
      this.titleIcon = this.iconName;
    } else if (e.detail.value === 'movie__year') {
      this.sort_by = 'Year';
      this.yearIcon = this.iconName;
    } else if (e.detail.value === 'movie__imdbrating') {
      this.sort_by = 'IMDb rating';
      this.imdbratingIcon = this.iconName;
    } else if (e.detail.value === 'movie__metascore') {
      this.sort_by = 'Metascore';
      this.metascoreIcon = this.iconName;
    } else if (e.detail.value === 'movie__runtime') {
      this.sort_by = 'Runtime';
      this.runtimeIcon = this.iconName;
    }
  }

  setOpenFilters(isOpen: boolean) {
    this.isFiltersModalOpen = isOpen;
  }
  refine() {
    if (
      this.credentials.value.sortBy === 'movie__title' ||
      this.credentials.value.sortBy === 'movie__runtime'
    ) {
      if (this.iconName === 'arrow-up-outline') {
        this.credentials.value.sortBy = '-' + this.credentials.value.sortBy;
      }
    } else if (this.iconName === 'arrow-down-outline') {
      this.credentials.value.sortBy = '-' + this.credentials.value.sortBy;
    }
    console.log(this.credentials.value.sortBy);
    this.refresh();
  }
  resetFilters() {
    this.lowerYears = this.years[0];
    this.upperYears = this.years.slice(-1);
    this.credentials = this.fb.group({
      sortBy: ['-movie__added_at', Validators.required],
      loweryears: [null, Validators.required],
      upperyears: [null, Validators.required],
    });
    this.sort_by = 'Date Added';
    this.iconName = 'arrow-down-outline';
    this.dateAddedIcon = this.iconName;
    this.titleIcon = 'none';
    this.yearIcon = 'none';
    this.imdbratingIcon = 'none';
    this.metascoreIcon = 'none';
    this.runtimeIcon = 'none';
  }
  onIonChange(e) {
    this.lowerYears = e.detail.value.lower;
    this.upperYears = e.detail.value.upper;
  }
}
