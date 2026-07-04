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
  {
    path: 'state',
    loadComponent: () =>
      import('./pages/state-page/state-list.component').then(
        (m) => m.StateListComponent
      ),
  },
  {
    path: 'district',
    loadComponent: () =>
      import('./pages/district-page/district-list.component').then(
        (m) => m.DistrictListComponent
      ),
  },
  {
    path: 'city',
    loadComponent: () =>
      import('./pages/city-page/city-list.component').then(
        (m) => m.CityListComponent
      ),
  },
];

@NgModule({
  providers: [
    { provide: ROUTES, multi: true, useValue: routes },
  ],
})
export class MasterRoutingModule {}
