import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPasswordConfirmPage } from './reset-password-confirm.page';

describe('ResetPasswordConfirmPage', () => {
  let component: ResetPasswordConfirmPage;
  let fixture: ComponentFixture<ResetPasswordConfirmPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
