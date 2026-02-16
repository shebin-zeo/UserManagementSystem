import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();


  // 1. Define routes that should NOT have the Bearer token
  const isExcluded = req.url.includes('/api/auth/login') || req.url.includes('/api/auth/refresh');

  if (token && !isExcluded) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};