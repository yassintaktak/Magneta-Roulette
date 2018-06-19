import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingTableComponent } from './betting-table.component';

describe('BettingTableComponent', () => {
  let component: BettingTableComponent;
  let fixture: ComponentFixture<BettingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
