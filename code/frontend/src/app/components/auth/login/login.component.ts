import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  handleLogin(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('formData', formData);

      this.authService.login(formData).subscribe({
        next: (response) => {
          this.toastr.success('Login successful');
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response._id);
          this.router.navigate(['/transaction']);
        },
        error: (error) => {
          this.toastr.error('Login failed. Please check your credentials.');
          console.error('Login failed:', error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields');
    }
  }

  navigateToPath(path: string): void {
    this.router.navigate([path]);
  }
}
