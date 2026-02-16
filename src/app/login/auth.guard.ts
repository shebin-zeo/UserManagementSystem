import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If not browser (SSR) → allow
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // If token exists → allow
  if (authService.isAuthenticated()) {
    return true;
  }

  // Try restoring session
  return authService.restoreSession().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};