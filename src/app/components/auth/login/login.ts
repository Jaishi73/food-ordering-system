import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../service/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  roles = ['admin', 'user', 'chef'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['user', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success && res.user) {
          const role = res.user.role;
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'chef') {
            this.router.navigate(['/chef']);
          } else {
            this.router.navigate(['/user-home']);
          }
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
