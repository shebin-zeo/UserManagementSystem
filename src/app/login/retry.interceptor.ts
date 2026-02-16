import { HttpInterceptorFn } from '@angular/common/http';
import { retryWhen, scan, delay } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {

  // Do NOT retry auth endpoints
  if (req.url.includes('/login') || req.url.includes('/refresh')) {
    return next(req);
  }

  return next(req).pipe(
    retryWhen(errors =>
      errors.pipe(
        scan((retryCount, error) => {

          // Retry only network errors
          if (retryCount >= 3 || error.status !== 0) {
            throw error;
          }

          return retryCount + 1;

        }, 0),
        delay(1000)
      )
    )
  );
};