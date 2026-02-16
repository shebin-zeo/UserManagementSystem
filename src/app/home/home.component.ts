import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router=inject(Router);
  private authService=inject(AuthService);

  navigateToList()
  {
    this.router.navigate(['/list'])
  }

  logout()
  {
    this.authService.logout();
   
    this.router.navigate(['/login'])
  }

}
