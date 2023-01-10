import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNewListPageRoutingModule } from './create-new-list-routing.module';

import { CreateNewListPage } from './create-new-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateNewListPageRoutingModule
  ],
  declarations: [CreateNewListPage]
})
export class CreateNewListPageModule {}
