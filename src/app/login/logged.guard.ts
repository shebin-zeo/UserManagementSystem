import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const loggedGuard: CanActivateFn = (route, state) => {

  


  const router=inject(Router)
  const platformId=inject(PLATFORM_ID);

  
  if(isPlatformBrowser(platformId))
  {
      const token=inject(AuthService).isLoggedIn();
      if(token)
      {
        router.navigate(['/home']);
        return false;
      }

  }


  return true;
};
