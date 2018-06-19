import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingInformationComponent } from './betting-information.component';

describe('BettingInformationComponent', () => {
  let component: BettingInformationComponent;
  let fixture: ComponentFixture<BettingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
