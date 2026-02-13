import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router=inject(Router);

  navigateToList()
  {
    this.router.navigate(['/list'])
  }

  logout()
  {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.router.navigate(['/login'])
  }

}
