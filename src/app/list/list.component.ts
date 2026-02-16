import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  private userService = inject(UserService);
  private router=inject(Router)

  users: any[] = [];
  totalRecords = 0;
  loading = false;

  loadUsers(event: any) {

    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    const filter = {}; // send your filter object

    this.userService.getAllUsers(filter, page, size)
      .subscribe(res => {

        this.users = res.content;        // Spring Page content
        this.totalRecords = res.totalElements;
        this.loading = false;

      });
  }

  viewUser(userId:string){

   console.log("The user id is : ",userId)

    this.router.navigate([`/user/${userId}`])

  }
}