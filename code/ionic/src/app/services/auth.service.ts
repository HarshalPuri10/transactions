import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular'; // Import Storage module
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.baseUrl}auth/user`;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create(); // Initialize storage
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string): Promise<void> {
    return this.storage.set('token', token); // Save token using Ionic Storage
  }

  getToken(): Promise<string | null> {
    return this.storage.get('token'); // Get token using Ionic Storage
  }

  logout(): Promise<void> {
    return this.storage.remove('token'); // Remove token using Ionic Storage
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token; // Check if token exists
  }
}
