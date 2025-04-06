import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  handleSignUp(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password, confirmPassword } = this.registerForm.value;

    this.authService
      .register({ name, email, password, confirmPassword })
      .subscribe({
        next: () => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/login']);
        },
        error: ({ error }) => {
          this.toastr.error(error?.error);
        },
      });
  }

  navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
