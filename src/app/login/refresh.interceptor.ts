import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);


   if (req.url.includes('/login') || req.url.includes('/refresh')) {
    return next(req);
  }

  return next(req).pipe(

    catchError(error => {

      if (error.status === 401 && !req.url.includes('/login')) {

        if (!isRefreshing) {

          isRefreshing = true;
          refreshSubject.next(null);

          return authService.refreshToken().pipe(

            switchMap((res: any) => {

              isRefreshing = false;

              authService.storeAccessToken(res.accessToken);
              refreshSubject.next(res.accessToken);

              return next(addToken(req, res.accessToken));
            }),

            catchError(err => {
              isRefreshing = false;
              authService.logout();
              return throwError(() => err);
            })
          );
        }

        return refreshSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => next(addToken(req, token!)))
        );
      }

      return throwError(() => error);
    })
  );
};

function addToken(req: any, token: string) {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}