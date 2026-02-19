import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../service/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { error } from 'console';
export interface User{
  userId:string,
  firstName:string,
  lastName:string,
  email:string,
  userType:number


}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,ButtonModule,DropdownModule,ToastModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers:[MessageService]
})



export class FormComponent implements OnInit {

  userIdUpdate:string=''

  ngOnInit(): void {
    const id=this.routes.snapshot.paramMap.get("id")
    console.log("User id for update : ",id)

    if(id)
    {
      this.isEdit=true

      this.userService.getUser(id).subscribe({
        next:(res)=>{
          this.user=res
        }
      })
    }
  }
 

  user:User={
    userId:'',
    firstName:'',
    lastName:'',
    email:'',
    userType:1

  }

  UserTypeOption=[
    {name:"ADMIN",value:0},
    {name:"GENERAL",value:1}
  ]

  errorMessages:any;

  isEdit=false;

  private router=inject(Router)

  private userService=inject(UserService)
  
  private message=inject(MessageService)

  private routes=inject(ActivatedRoute)
  


  home()
  {
    this.router.navigate(['/home'])
  }

  list()
  {
    this.router.navigate(['/list'])
  }



  saveUser(){
    if(this.isEdit)
    {
      this.updateUser()
    }
    else{
      this.userCreate()
    }
  }

  userCreate()
  {

    if(this.user.userType ===null)
    {
      this.message.add({
        severity:'secondary',
        summary: 'Warning',
         detail: 'Please choose Any user type'

      })
      return;
    }
    else{
      const payload={

          userId:this.user.userId,
          firstName:this.user.firstName,
          lastName:this.user.lastName,
          email:this.user.email,
          userType:this.user.userType
        
      }
      console.log("Data for sending to backend : ",payload)

      this.userService.createUser(payload).subscribe({
        next:(res)=>{

           this.message.add({
           key:'t1',
           severity: 'success', summary: 'Success', detail: "User Created"
           
         })
       this.cancel();
        
        },
        error:(err)=>{
         this.errorMessages=err.error

         if(err.error.message)
         {
         this.message.add({
           key:'t1',
           severity: 'warn', summary: 'Warn', detail: err.error.message
           
         })
        }
         console.log("Error messages in ",this.errorMessages)

         console.log("Direct message printing",err)
        }
      })
    }
    
  }


  updateUser()
  {
    this.userService.updateUser(this.user.userId,this.user).subscribe({
      next:()=>{
        this.message.add({
          severity:'success',
          summary:"SuccessFully Updated ",
          detail:"Successfully updated"+this.user.userId
        })
      },

      error:(err)=>{
         this.message.add({
          severity:'error',
          summary:"Error ",
          detail:err.error
        })
      }
    })


  }


  cancel()
  {
       this.user.userId='';
          this.user.firstName='';
          this.user.lastName='';
          this.user.email='';
  }

  


}
