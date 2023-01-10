import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabSearchPage } from './tab-search.page';

describe('TabSearchPage', () => {
  let component: TabSearchPage;
  let fixture: ComponentFixture<TabSearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabSearchPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TabSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
