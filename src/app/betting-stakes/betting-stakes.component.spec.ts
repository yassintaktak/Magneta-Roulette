import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingStakesComponent } from './betting-stakes.component';



describe('BettingStakesComponent', () => {
  let component: BettingStakesComponent;
  let fixture: ComponentFixture<BettingStakesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingStakesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingStakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
