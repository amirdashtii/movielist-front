import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
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
  testimonial: FormGroup;
  body: FormGroup;
  list = null;
  listitems = [];
  moviesList = [];
  years = [];
  search = '';
  currentPage = 1;
  page = 1;
  ress = '';
  isFiltersModalOpen = false;
  isEditModalOpen = false;
  isAddMovieModalOpen = false;
  iconName = 'arrow-down-outline';
  dateAddedIcon = this.iconName;
  titleIcon = 'none';
  yearIcon = 'none';
  imdbratingIcon = 'none';
  metascoreIcon = 'none';
  runtimeIcon = 'none';
  sort_by = 'Date Added';
  totalMovie = 0;
  currentMovie: any;
  currentActor = 'All';
  currentDirector = 'All';
  currentWriter = 'All';
  currentGenre = 'All';
  currentYears = 'All';
  currentType = 'All';
  yearRange: any = {
    answer: 'answer',
    lowerYears: null,
    upperYears: null,
  };

  lastEmittedValue: RangeValue;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private movieService: MovieService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loadList();
    this.loadListItems();
    this.credentials = this.fb.group({
      sortBy: ['-movie__added_at', Validators.required],
      loweryears: [null, Validators.required],
      upperyears: [null, Validators.required],
      actor: [null, Validators.required],
      director: [null, Validators.required],
      writer: [null, Validators.required],
      genre: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  ngOnInit() {}
  loadList() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getListDetails(id).subscribe((res) => {
      this.list = res;
      console.log('list', this.list);
      this.totalMovie = this.list.total_movie;
      this.testimonial = this.fb.group({
        name: [this.list.name, Validators.required],
        description: [this.list.description],
        id: [this.list.id],
      });

      for (var item of this.list.items) {
        this.years.push(item.movie.year);
      }
      this.years.sort();
      this.yearRange.lowerYears = this.years[0];
      this.yearRange.upperYears = this.years.slice(-1);
    });
  }
  async loadListItems() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.movieService
      .getListItemDetails(
        id,
        this.currentPage,
        this.credentials.value,
        this.search
      )
      .subscribe({
        next: async (res) => {
          await loading.dismiss();
          this.ress = res.next;
          this.listitems.push(...res.results);
          if (this.totalMovie === res.count) {
            this.currentMovie = res.count;
          } else
            this.currentMovie = res.count + ' (of ' + this.totalMovie + ')';
          console.log('listitems: ', this.listitems);
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
        this.loadListItems();
      }
    });
  }

  refresh() {
    this.listitems = [];
    this.currentPage = 1;
    this.infiniteScroll.disabled = false;
    this.loadListItems();
  }
  searchBar(event) {
    this.search = event.detail.value.toLowerCase();
    this.refresh();
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

  setOpenEdit(isOpen: boolean) {
    this.isEditModalOpen = isOpen;
  }
  async save() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.editList(this.testimonial.value).subscribe({
      next: async (_) => {
        await loading.dismiss();
        this.loadList();
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
  setOpenFilters(isOpen: boolean) {
    this.isFiltersModalOpen = isOpen;
  }
  setOpenAddMovie(isOpen: boolean) {
    this.isAddMovieModalOpen = isOpen;
  }
  refine() {
    if (this.credentials.value.sortBy[0] !== '-') {
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
    }
    this.refresh();
  }
  resetFilters() {
    this.yearRange.lowerYears = this.years[0];
    this.yearRange.upperYears = this.years.slice(-1);
    this.credentials = this.fb.group({
      sortBy: ['movie__added_at', Validators.required],
      loweryears: [null, Validators.required],
      upperyears: [null, Validators.required],
      actor: [null, Validators.required],
      director: [null, Validators.required],
      writer: [null, Validators.required],
      genre: [null, Validators.required],
      type: [null, Validators.required],
    });
    this.sort_by = 'Date Added';
    this.iconName = 'arrow-down-outline';
    this.dateAddedIcon = this.iconName;
    this.titleIcon = 'none';
    this.yearIcon = 'none';
    this.imdbratingIcon = 'none';
    this.metascoreIcon = 'none';
    this.runtimeIcon = 'none';
    this.currentYears = 'All';
  }
  onIonChange(e) {
    this.currentYears = e.detail.value.lower + '-' + e.detail.value.upper;
    this.yearRange.lowerYears = e.detail.value.lower;
    this.yearRange.upperYears = e.detail.value.upper;
  }
  actorHandel(event) {
    this.currentActor = event.detail.value == '' ? 'All' : event.detail.value;
  }
  directorHandel(event) {
    this.currentDirector =
      event.detail.value == '' ? 'All' : event.detail.value;
  }
  writerHandel(event) {
    this.currentWriter = event.detail.value == '' ? 'All' : event.detail.value;
  }
  genreHandel(event) {
    this.currentGenre = event.detail.value == '' ? 'All' : event.detail.value;
  }
  typeHandel(event) {
    this.currentType =
      event.detail.value == '' || event.detail.value == null
        ? 'All'
        : event.detail.value;
  }
  searchMoveBar(ev) {
      this.body = this.fb.group({
        title: [ev.detail.value],
        page: this.page
      });
      console.log(this.body)
      this.moviesList = [];
      this.searchMovie()
    }
    async searchMovie() {
      const loading = await this.loadingController.create({
          message: 'Loading..',
          spinner: 'bubbles',
        });
        await loading.present();
    this.movieService.searchMovie(this.body.value).subscribe({
      next: async (v) => {
        await loading.dismiss();
        if (v.Response === 'False') {
          console.log(v['Error']);
        } else {
          this.moviesList.push(...v.Search);
          console.log(this.moviesList);
        }
      },
      error: async (error) => {
        await loading.dismiss();
      },
    });
    
  }
  async addMovieToList(imdbID) {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    const body = { imdbid: imdbID, list_id: this.list.id};
    this.movieService.addMovieToList(body).subscribe({
      next: async (v) => {
        await loading.dismiss();
        this.refresh();
      },
      error: async (error) => {
        await loading.dismiss();
      },
    });
  }
  loadMoreSearch(event: any) {
    setTimeout(() => {
      this.page++;
      event.target.complete();
      if (this.ress === null) {
        event.target.disabled = true;
      } else {
        this.searchMovie();
      }
    });
  }
}
