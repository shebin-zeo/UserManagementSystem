import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';


export interface LoginBody{
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apI=environment.loginApi;

  private platformId=inject(PLATFORM_ID)


  constructor(
   private http:HttpClient
  ) { }

  login(body:LoginBody):Observable<any>{
    return this.http.post(`${this.apI}/login`,body)
  }

  isLoggedIn():boolean
  {
    const token=localStorage.getItem('access_token');
    return !!token;
  }

  getToken():string | null {
    if(isPlatformBrowser(this.platformId))
    {
      return localStorage.getItem("access_token");
    }
    return  null
  }

}
