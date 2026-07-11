import { NgModule } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';
import { AdminEpinRequestListPageComponent } from './pages/epin-request-list/epin-request-list-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'requested-list',
    pathMatch: 'full',
  },
  {
    path: 'requested-list',
    component: AdminEpinRequestListPageComponent,
  },
];

@NgModule({
  providers: [
    { provide: ROUTES, multi: true, useValue: routes },
  ],
})
export class EpinManagerRoutingModule {}
