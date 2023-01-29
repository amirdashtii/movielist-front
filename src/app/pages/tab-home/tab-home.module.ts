import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabListPage } from './tab-home.page';

import { TabListPageRoutingModule } from './tab-home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabListPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TabListPage],
})
export class TabHomePageModule {}
