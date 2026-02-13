import { Component, inject, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})
export class LoginComponent {

  username:string='';
  password:string='';

  private authService=inject(AuthService);

  private router=inject(Router);

  private messageService=inject(MessageService);
  



  login(){

    const body={
    username:this.username,
    password:this.password
  }
    this.authService.login(body).subscribe({
      next:(res)=>{
        console.log(res);

        localStorage.setItem('access_token',res.access_token)
        localStorage.setItem('refresh_token',res.refresh_token)

        this.messageService.add({
          key:'t1',
          severity:'success',
          summary:'Login Successful',
          detail:'Welcome back '+this.username,
          life:3000
        })

        setTimeout(()=>{
          this.router.navigate(['/home'])
        },1500)
        

      },
      error:(err)=>{

        this.messageService.add({
          key:'t1',
          severity:'error',
          summary:'Login Failed',
          detail:err.error.message || 'An error occurred during login',
          life:3000
        })
        console.log(err)
      }
    
    })

  }

 

 




}
