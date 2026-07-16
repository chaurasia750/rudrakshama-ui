import { NgModule } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';
import { DepositInAccountPageComponent } from './pages/deposit-in-account/deposit-in-account-page.component';
import { DebitFromAccountPageComponent } from './pages/debit-from-account/debit-from-account-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'deposit-in-account',
    pathMatch: 'full',
  },
  {
    path: 'deposit-in-account',
    component: DepositInAccountPageComponent,
  },
  {
    path: 'debit-from-account',
    component: DebitFromAccountPageComponent,
  },
];

@NgModule({
  providers: [
    { provide: ROUTES, multi: true, useValue: routes },
  ],
})
export class FinancialManagerRoutingModule {}
