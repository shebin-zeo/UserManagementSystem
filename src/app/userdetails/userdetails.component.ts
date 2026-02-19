import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [FormsModule,ButtonModule,ToastModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
  providers:[MessageService]
})
export class UserdetailsComponent implements OnInit,OnDestroy{

  // For like Enum mapping in user type 0 and 1 
  private userTypeMap:Record<number,string>=
  {
    0:"ADMIN",
    1:"GENERAL"
  }

  private statusTypeMap:Record<string,string>={
    "PROCEED":"PENDING",
    "ACTIVE":"APPROVED",
    "DELETED":"DELETED"
  }

  users:any
  
  loading=true;
  error:string |null=null;


  private destroy$=new Subject<void>();

  private routes=inject(ActivatedRoute)
  private userService=inject(UserService)

private router=inject(Router)
 private messageService=inject(MessageService);

  ngOnInit(): void {

    this.routes.paramMap
    .pipe(
      switchMap(params=>{
        const id=params.get('id')
        if(!id) throw new Error("Invalid user Id");
        this.loading=true;
        return this.userService.getUser(id);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(data)=>
      {
        this.users={
          ...data,
        userTypeLabel:this.userTypeMap[data.userType] ?? "UNKNOWN",
        statusTypeLabel:this.statusTypeMap[data.status] ?? "UNKNOWN"
        }
        console.log(this.users);
        this.loading=false
      },
      error:(err)=>{
        this.error=err.error
        this.loading=false
      }
    })
  }

  ngOnDestroy(): void {
    
    this.destroy$.next();
    this.destroy$.complete();
  }


  home(){
    this.router.navigate(['/home'])
  }

  list(){
    this.router.navigate(['/list'])
  }
  
  verifyData()
  {
   const userId= this.routes.snapshot.paramMap.get("id")
   if(userId)
   {
    this.userService.verifyUser(userId).subscribe({
      next:(res)=>{

        
        this.messageService.add({
           severity: 'success', summary: 'Success', detail: 'User Successfully Verified' 
        })
      },
      error:(err)=>{
        console.log("Message error: ",err.error.message)
        this.messageService.add(
          { severity: 'error', summary: 'Error', detail: err.error.message }
        )
      }
    })
   }
  }


}
