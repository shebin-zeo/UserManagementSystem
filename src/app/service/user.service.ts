import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export enum UserType{
  ADMIN=0,
  USER=1
}

export interface User{
  userId:string;
  firstName:string;
  lastName:string;
  email:string;
  userType:UserType

}

export type SortDirection='ASC' | 'DESC';


export interface UserSearchCriteria{
  userId?:string;
  firstName?:string;
  email?:string;
  status?:string;
  sortBy?:string;
  sortDirection?:SortDirection;
}

export interface Page<T>
{
  content:T[];
  totalPages: number;
  totalElements: number; // small changes if no page serializer direct else through page under
  size: number;
  number: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private apiUrl=environment.api;
  private http=inject(HttpClient)
  private router=inject(Router);


  // http://localhost:1500/api/user/create
  // http://localhost:1500/api/user/get/manu
  // http://localhost:1500/api/user/update/raju
  // http://localhost:1500/api/user/delete/raju
  // http://localhost:1500/api/user/all

  createUser(body:User):Observable<any>
   {
  return this.http.post(`${this.apiUrl}/create`,body)
   }
  
  getUser(userId:string):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/get/${userId}`)
  }
  updateUser(userId:string,body:User):Observable<any>
  {
    return this.http.put(`${this.apiUrl}/update/${userId}`,body)
  }

  deleteUser(userId:string):Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`)
  }

  getAllUsers(
    filter:UserSearchCriteria,
    page:number,
    size:number
  ):Observable<any>
  {
    return this.http.post<Page<any>>(`${this.apiUrl}/all?page=${page}&size=${size}`,filter)
  }

  verifyUser(userId:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/verify/${userId}`,{})

  }
}
