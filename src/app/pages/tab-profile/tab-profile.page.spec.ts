import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { TabProfilePage } from './tab-profile.page';

describe('TabProfilePage', () => {
  let component: TabProfilePage;
  let fixture: ComponentFixture<TabProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabProfilePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TabProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
