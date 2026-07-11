import { Component } from '@angular/core';
import { EpinRequestListComponent } from '@shared/members/src';

@Component({
  selector: 'admin-epin-request-list-page',
  standalone: true,
  imports: [EpinRequestListComponent],
  template: `<shared-epin-request-list [showActions]="true" />`,
})
export class AdminEpinRequestListPageComponent {}
