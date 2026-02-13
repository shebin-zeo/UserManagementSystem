import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface LoginBody{
  username:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apI=environment.loginApi;

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

}
