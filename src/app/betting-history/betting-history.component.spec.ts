import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingHistoryComponent } from './betting-history.component';

describe('BettingHistoryComponent', () => {
  let component: BettingHistoryComponent;
  let fixture: ComponentFixture<BettingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
