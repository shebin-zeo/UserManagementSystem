import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const platformId=inject(PLATFORM_ID);
  // const token=localStorage.getItem("access_token");

  if(isPlatformBrowser(platformId))
  {
    const token=inject(AuthService).isLoggedIn();
    if(!token)
    {
      router.navigate(['/login'])
      return false;
    }
  }


  
  return true;
};
