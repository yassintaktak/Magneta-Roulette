import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingInfoComponent } from './betting-info.component';

describe('BettingInfoComponent', () => {
  let component: BettingInfoComponent;
  let fixture: ComponentFixture<BettingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
