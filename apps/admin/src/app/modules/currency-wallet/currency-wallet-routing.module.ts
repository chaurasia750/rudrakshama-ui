import { NgModule } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';
import { EwalletPageComponent } from './pages/ewallet/ewallet-page.component';
import { TransactionHistoryPageComponent } from './pages/transaction-history/transaction-history-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ewallet',
    pathMatch: 'full',
  },
  {
    path: 'ewallet',
    component: EwalletPageComponent,
  },
  {
    path: 'transaction-history',
    component: TransactionHistoryPageComponent,
  },
];

@NgModule({
  providers: [
    { provide: ROUTES, multi: true, useValue: routes },
  ],
})
export class CurrencyWalletRoutingModule {}
