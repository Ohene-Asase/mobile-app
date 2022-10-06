import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppointmentPagePage } from './appointment-page.page';

describe('AppointmentPagePage', () => {
  let component: AppointmentPagePage;
  let fixture: ComponentFixture<AppointmentPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
