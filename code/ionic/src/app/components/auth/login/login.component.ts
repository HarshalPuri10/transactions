import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router'; // Import ActivatedRoute
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
  // imports: [
  //   CommonModule,
  //   RouterModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   IonicModule,
  // ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  handleLogin(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.authService.login(formData).subscribe({
        next: (response) => {
          this.toastr.success('Login successful');
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response._id);
          this.navCtrl.navigateRoot('/transaction');
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
    this.navCtrl.navigateForward(path);
  }
}
