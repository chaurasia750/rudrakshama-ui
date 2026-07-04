import { NgModule } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'country',
    loadComponent: () =>
      import('./pages/country-page/country-list.component').then(
        (m) => m.CountryListComponent
      ),
  },
];

@NgModule({
  providers: [
    { provide: ROUTES, multi: true, useValue: routes },
  ],
})
export class MasterRoutingModule {}
