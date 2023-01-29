import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailPageRoutingModule } from './list-detail-routing.module';

import { ListDetailPage } from './list-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListDetailPageRoutingModule
  ],
  declarations: [ListDetailPage]
})
export class ListDetailPageModule {}
