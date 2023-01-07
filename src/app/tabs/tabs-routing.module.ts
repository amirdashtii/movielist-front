import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
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
          canLoad: [AuthGuard]
      },
      {
        path: 'tab-search',
        loadChildren: () =>
          import('../tab-search/tab-search.module').then(
            (m) => m.TabSearchPageModule
          ),
          canLoad: [AuthGuard]
      },
      {
        path: 'tab-profile',
        loadChildren: () =>
          import('../tab-profile/tab-profile.module').then(
            (m) => m.TabProfilePageModule
          ),
          canLoad: [AuthGuard]
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
