import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabSearchPage } from './tab-list.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

import { TabSearchPageRoutingModule } from './tab-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    TabSearchPageRoutingModule,
  ],
  declarations: [TabSearchPage],
})
export class TabListPageModule {}
