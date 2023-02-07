import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActionSheetController,
  AlertController,
  IonModal,
  LoadingController,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab-list',
  templateUrl: 'tab-list.page.html',
  styleUrls: ['tab-list.page.scss'],
})
export class TabListPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  credentials: FormGroup;
  testimonial: FormGroup;
  lists = [];
  ress = null;
  isSortModalOpen = false;
  isCreateModalOpen = false;
  sort_by = 'Date Added';
  dateAddedIcon = 'arrow-down-outline';
  listNameIcon = 'none';

  constructor(
    private movieService: MovieService,
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.allMovie();
    this.credentials = this.fb.group({
      sortBy: ['-created_at', Validators.required],
    });
    this.testimonial = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {}

  async allMovie() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
    this.movieService.getList(this.credentials.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        console.log(res);
        this.lists.push(...res);
      },
      error: async (error) => {
        await loading.dismiss();
      },
    });
  }
  refresh() {
    if (
      this.dateAddedIcon === 'arrow-down-outline' ||
      this.listNameIcon === 'arrow-up-outline'
    ) {
      this.credentials.value.sortBy = '-' + this.credentials.value.sortBy;
    }
    this.lists = [];
    this.allMovie();
  }
  setOpenSort(isOpen: boolean) {
    this.isSortModalOpen = isOpen;
  }
  resetSort() {
    this.credentials = this.fb.group({
      sortBy: ['created_at', Validators.required],
    });
    this.sort_by = 'Date Added';
    this.dateAddedIcon = 'arrow-down-outline';
    this.listNameIcon = 'none';
  }
  handleChange(e) {
    if (e.detail.value === 'created_at') {
      this.sort_by = 'Date Added';
      this.dateAddedIcon = 'arrow-down-outline';
      this.listNameIcon = 'none';
    } else if (e.detail.value === 'name') {
      this.sort_by = 'List Name';
      this.listNameIcon = 'arrow-down-outline';
      this.dateAddedIcon = 'none';
    }
  }
  dateAddedDir() {
    if (this.dateAddedIcon === 'arrow-down-outline') {
      this.dateAddedIcon = 'arrow-up-outline';
    } else if (this.dateAddedIcon === 'arrow-up-outline') {
      this.dateAddedIcon = 'arrow-down-outline';
    }
  }
  listNameDir() {
    if (this.listNameIcon === 'arrow-down-outline') {
      this.listNameIcon = 'arrow-up-outline';
    } else if (this.listNameIcon === 'arrow-up-outline') {
      this.listNameIcon = 'arrow-down-outline';
    }
  }
  async presentDeleteSheet(list) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Loading..',
              spinner: 'bubbles',
            });
            await loading.present();
            this.movieService.deleteList(list.id).subscribe({
              next: async (res) => {
                await loading.dismiss();
                this.refresh();
              },
              error: async (error) => {
                await loading.dismiss();
              },
            });
          },
        },
        {
          text: 'No',
        },
      ],
    });

    await actionSheet.present();
  }
  setOpenCreate(isOpen: boolean) {
    this.isCreateModalOpen = isOpen;
  }
  async save() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.createNweList(this.testimonial.value).subscribe({
      next: async (_) => {
        await loading.dismiss();
        this.refresh();
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
