import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabProfilePage } from './tab-profile.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabProfilePageRoutingModule } from './tab-profile-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabProfilePageRoutingModule,
  ],
  declarations: [TabProfilePage],
})
export class TabProfilePageModule {}
