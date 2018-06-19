import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingRouletteComponent } from './betting-roulette.component';

describe('BettingRouletteComponent', () => {
  let component: BettingRouletteComponent;
  let fixture: ComponentFixture<BettingRouletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingRouletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingRouletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
