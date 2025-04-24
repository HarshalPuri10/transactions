import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  // imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: false,
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  transactions: any[] = [];
  dashboard: any = {
    profit: 0,
    loss: 0,
  };
  userId: string = '';
  showForm = false;
  isEditMode = false;
  selectedTransactionId: string | null = null;

  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      userId: [''],
      title: ['', Validators.required],
      date: ['', Validators.required],
      amount: [null, Validators.required],
      category: ['', Validators.required],
      type: ['expense', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.getAllTransactions();
    this.getDashboard();
  }

  getAllTransactions() {
    this.transactionService.getAll({ userId: this.userId }).subscribe({
      next: (res: any) => {
        this.transactions = res?.rows || [];
      },
      error: (err) => {
        console.error('Failed to fetch transactions', err);
      },
    });
  }

  getDashboard() {
    this.transactionService.getDashboard({ userId: this.userId }).subscribe({
      next: (res: any) => {
        this.dashboard = res || {
          profit: 0,
          loss: 0,
        };
      },
      error: (err) => {
        console.error('Failed to fetch transactions', err);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  createTransaction() {
    this.transactionForm.reset({ type: 'expense' });
    this.selectedTransactionId = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  editTransaction(txn: any) {
    this.transactionForm.patchValue(txn);
    this.selectedTransactionId = txn._id; // assuming MongoDB _id
    this.isEditMode = true;
    this.showForm = true;
  }

  onSubmit() {
    if (this.transactionForm.invalid) return;

    const formData = this.transactionForm.value;
    formData.userId = this.userId;

    if (this.isEditMode && this.selectedTransactionId) {
      this.transactionService
        .update(this.selectedTransactionId, formData)
        .subscribe({
          next: () => {
            this.getAllTransactions();
            this.getDashboard();
            this.resetForm();
          },
          error: (err) => console.error('Update failed', err),
        });
    } else {
      this.transactionService.create(formData).subscribe({
        next: (result: any) => {
          this.toastr.success(result.message);

          this.getAllTransactions();
          this.getDashboard();
          this.resetForm();
        },
        error: (err) => console.error('Create failed', err),
      });
    }
  }

  deleteTransaction(id: string) {
    this.transactionService.delete(id).subscribe({
      next: () => {
        this.getAllTransactions();
        this.getDashboard();
      },
      error: (err) => console.error('Delete failed', err),
    });
  }

  cancelForm() {
    this.resetForm();
  }

  private resetForm() {
    this.transactionForm.reset({ type: 'expense' });
    this.showForm = false;
    this.isEditMode = false;
    this.selectedTransactionId = null;
  }
}
