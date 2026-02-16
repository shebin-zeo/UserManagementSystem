import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from "primeng/toast";
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo';

  constructor(private authService: AuthService) {}

// ngOnInit() {
//   this.authService.restoreSession().subscribe({
//     error: () => {
//       // Not logged in, stay on login
//     }
//   });
// }
}
