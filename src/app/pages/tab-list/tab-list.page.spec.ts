import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { TabListPage } from './tab-list.page';

describe('TabSearchPage', () => {
  let component: TabListPage;
  let fixture: ComponentFixture<TabListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabListPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TabListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
