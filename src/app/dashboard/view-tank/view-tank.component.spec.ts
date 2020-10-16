import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTankComponent } from './view-tank.component';

describe('ViewTankComponent', () => {
  let component: ViewTankComponent;
  let fixture: ComponentFixture<ViewTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
