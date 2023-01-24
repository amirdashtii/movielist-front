import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordConfirmPage } from './reset-password-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordConfirmPageRoutingModule {}
