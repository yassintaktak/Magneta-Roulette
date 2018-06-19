import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BettingTableComponent } from './betting-table/betting-table.component';
import { BettingStakesComponent } from './betting-stakes/betting-stakes.component';
import { BettingOptionsComponent } from './betting-options/betting-options.component';
import { BettingInformationComponent } from './betting-information/betting-information.component';
import { BettingHistoryComponent } from './betting-history/betting-history.component';
import { BettingRouletteComponent } from './betting-roulette/betting-roulette.component';
import { BettingInfoComponent } from './betting-info/betting-info.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    BettingTableComponent,
    BettingStakesComponent,
    BettingOptionsComponent,
    BettingInformationComponent,
    BettingHistoryComponent,
    BettingRouletteComponent,
    BettingInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
