import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-list',
        loadChildren: () =>
          import('../tab-list/tab-list.module').then(
            (m) => m.TabListPageModule
          ),
      },
      {
        path: 'tab-search',
        loadChildren: () =>
          import('../tab-search/tab-search.module').then(
            (m) => m.TabSearchPageModule
          ),
      },
      {
        path: 'tab-profile',
        loadChildren: () =>
          import('../tab-profile/tab-profile.module').then(
            (m) => m.TabProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
