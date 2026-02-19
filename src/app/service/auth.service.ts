import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post<any>(`${environment.loginApi}/login`, body, {
      withCredentials: true
    }).pipe(
      tap(res => {
        this.accessToken = res.accessToken;
      })
    );
  }

  getToken(): string | null {
    return this.accessToken;
  }

  storeAccessToken(token: string) {
    this.accessToken = token;
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.loginApi}/refresh`, {}, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    this.accessToken = null;
    return this.http.post(`${environment.loginApi}/logout`, {}, {
      withCredentials: true
    });
  }

   isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  restoreSession(): Observable<any> {
    return this.refreshToken().pipe(
      tap(res => {
        this.accessToken = res.accessToken;
      })
    );
  }
}