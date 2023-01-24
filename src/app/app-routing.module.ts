import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'create-new-list',
    loadChildren: () =>
      import('./pages/create-new-list/create-new-list.module').then(
        (m) => m.CreateNewListPageModule
      ),
    canLoad: [AuthGuard],
  },

  {
    path: 'activation/:uid/:token',
    loadChildren: () =>
      import('./pages/activate/activate.module').then(
        (m) => m.ActivatePageModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    
    path: 'password/reset/confirm/:uid/:token',
    loadChildren: () =>
      import(
        './pages/reset-password-confirm/reset-password-confirm.module'
      ).then((m) => m.ResetPasswordConfirmPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
