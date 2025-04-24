import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your AuthService
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = `${environment.baseUrl}sales/transaction`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to add Authorization header
  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add Bearer token to the headers
    });
  }

  create(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payload, {
      headers: this.getAuthHeaders(), // Attach the token here
    });
  }

  getAll(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`, {
      params,
      headers: this.getAuthHeaders(), // Attach the token here
    });
  }

  getDashboard(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/getDashboard`, {
      params,
      headers: this.getAuthHeaders(), // Attach the token here
    });
  }

  update(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, payload, {
      headers: this.getAuthHeaders(), // Attach the token here
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById/${id}`, {
      headers: this.getAuthHeaders(), // Attach the token here
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(), // Attach the token here
    });
  }
}
