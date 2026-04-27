import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent {
  updateForm: FormGroup;
  error: string | null = null;
  success: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
       ? null : {'mismatch': true};
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.loading = true;
      this.error = null;
      this.authService.updatePassword(this.updateForm.value).subscribe({
        next: () => {
          this.success = 'Password updated successfully!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (err) => {
          this.error = err.error?.message || err.error || 'Failed to update password. Please check your credentials.';
          this.loading = false;
        }
      });
    }
  }
}
