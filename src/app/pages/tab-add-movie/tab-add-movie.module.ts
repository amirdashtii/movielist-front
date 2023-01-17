import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAddMoviePageRoutingModule } from './tab-add-movie-routing.module';

import { TabAddMoviePage } from './tab-add-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TabAddMoviePageRoutingModule,
  ],
  declarations: [TabAddMoviePage],
})
export class TAbAddMoviePageModule {}
