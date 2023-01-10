import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabSearchPage } from './tab-search.page';

const routes: Routes = [
  {
    path: '',
    component: TabSearchPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabSearchPageRoutingModule {}
