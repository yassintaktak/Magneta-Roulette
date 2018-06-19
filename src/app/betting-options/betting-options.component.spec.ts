import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingOptionsComponent } from './betting-options.component';

describe('BettingOptionsComponent', () => {
  let component: BettingOptionsComponent;
  let fixture: ComponentFixture<BettingOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
