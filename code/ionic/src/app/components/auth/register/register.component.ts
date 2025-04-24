import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: false,
  // imports: [IonicModule, FormsModule, ReactiveFormsModule],
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
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatcher }
    );
  }

  // Custom validator to match password and confirmPassword fields
  passwordMatcher(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { mismatch: true };
    }

    return null;
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
          this.toastr.error(error?.error || 'Registration failed');
        },
      });
  }

  navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
