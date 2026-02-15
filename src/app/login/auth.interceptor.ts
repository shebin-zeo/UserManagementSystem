import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const platformId=inject(PLATFORM_ID)
  

  const token=inject(AuthService).getToken();
  // const token=

  if(req.url.includes('/login'))
  {
    return next(req)
  }

  if(token)
  {
    req=req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    })
  }
  
  return next(req);
};
