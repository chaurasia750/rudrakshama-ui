import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '@shared/environments/api.dev';
import { finalize } from 'rxjs';

@Component({
  selector: 'shared-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  private readonly http = inject(HttpClient);

  readonly appPrefix = input<string>('');

  readonly isSubmitting = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');
  readonly showOld = signal(false);
  readonly showNew = signal(false);
  readonly showConfirm = signal(false);

  model = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  onSubmit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.model.newPassword !== this.model.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isSubmitting.set(true);
    this.http
      .post<{ message: string }>(`${apiConfig.baseUrl}/auth/change-password`, {
        oldPassword: this.model.oldPassword,
        newPassword: this.model.newPassword,
      }, { withCredentials: true })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (res) => {
          this.successMessage.set((res as any)?.message || 'Password changed successfully');
          this.model = { oldPassword: '', newPassword: '', confirmPassword: '' };
        },
        error: (err) => {
          const body = err.error;
          const msg = body?.message?.text || body?.message || err.message || 'Failed to change password';
          this.errorMessage.set(msg);
        },
      });
  }
}
