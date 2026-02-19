import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './login/auth.interceptor';
import { refreshInterceptor } from './login/refresh.interceptor';
import { errorInterceptor } from './login/error.interceptor';
import { retryInterceptor } from './login/retry.interceptor';
import { ngrokInterceptor  } from './ngrok-interceptor.interceptor';





export const appConfig: ApplicationConfig = {
  providers: 
  [provideRouter(routes),
     provideClientHydration(),
     provideHttpClient(
      withFetch(),
      withInterceptors(

        [
          ngrokInterceptor, 
          authInterceptor,
          refreshInterceptor,
          retryInterceptor,
          errorInterceptor,
          

        ],
       
      )
    ),
     provideAnimations(),
    ],

};
