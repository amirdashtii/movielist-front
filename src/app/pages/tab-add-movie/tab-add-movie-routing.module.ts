import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAddMoviePage } from './tab-add-movie.page';

const routes: Routes = [
  {
    path: '',
    component: TabAddMoviePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAddMoviePageRoutingModule {}
