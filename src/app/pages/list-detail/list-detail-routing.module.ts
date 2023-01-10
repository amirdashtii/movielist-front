import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDetailPage } from './list-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ListDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDetailPageRoutingModule {}
