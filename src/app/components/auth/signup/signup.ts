import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../service/authservice';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  roles = ['admin', 'user', 'chef'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    if (this.signupForm.invalid || this.isSubmitting) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.signup(this.signupForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.successMessage = res.message || 'Account created! Please login.';
          setTimeout(() => this.router.navigate(['/login']), 1000);
        } else {
          this.errorMessage = res.message || 'Signup failed';
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
