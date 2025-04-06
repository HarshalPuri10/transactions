import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { Routes, RouterModule } from '@angular/router'; // 👈 don't forget RouterModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'transactions',
    children: [
      { path: 'list', component: TransactionListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
];

@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class TransactionModule {}
