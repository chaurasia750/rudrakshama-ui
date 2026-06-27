import { Component } from '@angular/core';
import { ChangePasswordComponent } from '@shared/ui/src';

@Component({
  selector: 'app-admin-change-password-page',
  standalone: true,
  imports: [ChangePasswordComponent],
  template: `
    <div class="p-6">
      <h2 class="mb-6 text-xl font-semibold text-primary-fg">Change Password</h2>
      <shared-change-password />
    </div>
  `,
})
export class AdminChangePasswordPageComponent {}
