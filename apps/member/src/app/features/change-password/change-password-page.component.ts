import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ChangePasswordComponent } from '@shared/ui/src';

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBreadcrumbComponent, ChangePasswordComponent],
  template: `
    <app-page-breadcrumb pageTitle="Change Password" />
    <shared-change-password />
  `,
})
export class ChangePasswordPageComponent {}
