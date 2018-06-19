import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BettingHistoryComponent }      from './betting-history/betting-history.component';
import { BettingInformationComponent }      from './betting-information/betting-information.component';

const routes: Routes = [
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'history', component: BettingHistoryComponent },
  { path: 'info', component: BettingInformationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
