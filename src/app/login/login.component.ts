import { Component, inject, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username:string='';
  password:string='';

  private authService=inject(AuthService);

  private router=inject(Router);



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
        this.router.navigate(['/home'])

      },
      error:(err)=>{
        console.log(err)
      }
    
    })

  }

 

 




}
