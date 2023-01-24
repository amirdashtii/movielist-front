import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordConfirmPageRoutingModule } from './reset-password-confirm-routing.module';

import { ResetPasswordConfirmPage } from './reset-password-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordConfirmPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswordConfirmPage]
})
export class ResetPasswordConfirmPageModule {}
