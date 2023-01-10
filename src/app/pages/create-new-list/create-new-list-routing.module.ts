import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewListPage } from './create-new-list.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewListPageRoutingModule {}
