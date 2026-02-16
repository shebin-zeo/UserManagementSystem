import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar'; // Use Toolbar instead
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ToastModule,ToolbarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [MessageService]
})
export class ListComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private exist=inject(AuthService)
  
  users: any[] = [];
  totalRecords = 0;
  loading = false;
  selectedUser: any = null;


 userTypeMap:Record<number,string>={
    0:"ADMIN",
    1:"GENERAL"

  }

  userStatus:Record<string,string>={
    "ACTIVE":"APPROVED",
    "PROCEED":"PENDING",
    "DELETED":"DELETED"
  }

  ngOnInit() {
    // Initial load
    this.loadUsers({ first: 0, rows: 10 });
  }

  loadUsers(event: any) {
    this.loading = true;
    const page = event.first / event.rows;
    const size = event.rows;
    const filter = {}; 
    
    this.userService.getAllUsers(filter, page, size)
      .subscribe({
        next: (res) => {
          this.users = res.content;
          this.totalRecords = res.totalElements;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            key: 't1',
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load users',
            life: 3000
          });
        }
      });
  }

  viewUser() {
    if (!this.selectedUser) {
      this.messageService.add({
        key: 't1',
        severity: 'warn',
        summary: 'No Selection',
        detail: 'Please select a user to view',
        life: 3000
      });
      return;
    }
    
    const userId = this.selectedUser.userId;
    // Fixed: Proper router navigation syntax
    this.router.navigate(['/user', userId]);
  }

  createUser() {
    this.router.navigate(['/user/create']);
  }

  updateUser() {
    if (!this.selectedUser) {
      this.messageService.add({
        key: 't1',
        severity: 'warn',
        summary: 'No Selection',
        detail: 'Please select a user to update',
        life: 3000
      });
      return;
    }
    const userId = this.selectedUser.userId;
    this.router.navigate(['/user/edit', userId]);
  }

  deleteUser() {
    if (!this.selectedUser) {
      this.messageService.add({
        key: 't1',
        severity: 'warn',
        summary: 'No Selection',
        detail: 'Please select a user to delete',
        life: 3000
      });
      return;
    }
    // Add your delete logic here

    this.userService.deleteUser(this.selectedUser.userId).subscribe({
      next:(res)=>{
        this.messageService.add({
          key:'t1',
          severity:'info',
          summary:this.selectedUser.firstName+" "+"Deleted Successfully",
          life:1000

        })
      },
      error:(err)=>{
        console.log(err)
        this.messageService.add({
          key:'t1',
          severity:'Have an issue with deleting ',
          summary:err.error,
          life:1000

        })

      }
    })
  }

  goHome() {
    this.router.navigate(['/']);
  }


  logout(){
    this.exist.logout().subscribe({
      next:(res)=>{
        this.messageService.add({
           key: 't1',
        severity: 'success',
        summary: 'Logout Successful',
        life: 1000
        })
      }
    });
    setTimeout(()=>{
    this.router.navigate(['/login'])

    },1000)
  }
}