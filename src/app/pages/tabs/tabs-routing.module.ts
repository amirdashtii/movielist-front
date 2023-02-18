import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-home',
        loadChildren: () =>
          import('../tab-home/tab-home.module').then(
            (m) => m.TabHomePageModule
          ),
        canLoad: [AuthGuard],
      },
      {
        path: 'tab-list',
        loadChildren: () =>
          import('../tab-list/tab-list.module').then(
            (m) => m.TabListPageModule
          ),
        canLoad: [AuthGuard],
      },
      {
        path: 'tab-list/:id',
        loadChildren: () =>
          import('../list-detail/list-detail.module').then(
            (m) => m.ListDetailPageModule
          ),
        canLoad: [AuthGuard],
      },
      {
        path: 'tab-list/:id/items/:id',
        loadChildren: () =>
          import('../movie-detail/movie-detail.module').then(
            (m) => m.MovieDetailPageModule
          ),
        canLoad: [AuthGuard],
      },
      {
        path: 'tab-profile',
        loadChildren: () =>
          import('../tab-profile/tab-profile.module').then(
            (m) => m.TabProfilePageModule
          ),
        canLoad: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/tab-home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab-home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
