import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = `${environment.baseUrl}sales/transaction`;

  constructor(private http: HttpClient) {}

  create(payload: any) {
    return this.http.post(`${this.apiUrl}/create`, payload);
  }
  getAll(params: any) {
    return this.http.get(`${this.apiUrl}/getAll`, { params });
  }
  getDashboard(params: any) {
    return this.http.get(`${this.apiUrl}/getDashboard`, { params });
  }

  update(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, payload);
  }
  getById(id: string) {
    return this.http.get(`${this.apiUrl}/getById/${id}`);
  }
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
