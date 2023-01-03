import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSearchPage } from './tab-search.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabSearchPageRoutingModule } from './tab-search-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabSearchPageRoutingModule,
  ],
  declarations: [TabSearchPage],
})
export class TabSearchPageModule {}
