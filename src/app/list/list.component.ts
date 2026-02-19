import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar'; // Use Toolbar instead
import { AuthService } from '../service/auth.service';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {FloatLabelModule} from 'primeng/floatlabel'
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, ButtonModule, ToastModule, ToolbarModule, NgClass, InputTextModule, DropdownModule,FormsModule,FloatLabelModule,InputIconModule,IconFieldModule],
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

  userIdFilter?: string ;
firstNameFilter?: string;
emailFilter?: string;
statusFilter?: string;
sortByFilter?: string;
sortDirectionFilter?: 'ASC'|'DESC';


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
    this.loadUsers({ first: 0, rows: 8 });
  }

  loadUsers(event: any) {
    this.loading = true;
    const page = event.first / event.rows;
    const size = event.rows;
    const filter = {
      userId:this.userIdFilter,
      firstName:this.firstNameFilter,
      email:this.emailFilter,
      status:this.statusFilter,
      sortBy:this.sortByFilter,
      sortDirection:this.sortDirectionFilter
    }; 
    
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

  applyFilter()
  {
    this.loadUsers( {first: 0, rows: 8 })
  }


// Coloring the user status base with angular ng class
  getStatusColour(status: string): string {
  switch (status) {
    case "ACTIVE":
      return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium pi pi-verified';
    case "PROCEED":
      return 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm font-medium pi pi-info-circle';
    case "DELETED":
      return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium pi pi-trash';
    default:
      return '';
  }
}

getUserTypeColor(userType:number):string{
  switch(userType){
    case 0:
      return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold';
    case 1:
      return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm fond-semibold';
    default:
      return '';
    }
  }


  clearFilter()
  {
     this.userIdFilter = undefined;
  this.firstNameFilter = undefined;
  this.emailFilter = undefined;
  this.statusFilter = undefined;
  this.sortByFilter = undefined;
  this.sortDirectionFilter = undefined;
  
   
    this.loadUsers({first:0,rows:8})
    
  }

  userStatusOptions=[
    {name:"APPROVED",value:"ACTIVE"},
    {name:"PENDING",value:"PROCEED"},
    {name:"DELETED",value:"DELETED"}
  ]

  sortByOptions=[
    {name:"User ID",value:"userId"},
    {name:"First Name", value:"firstName"},
    {name:"Email",value:"email"}
  ]
  sortByDirectionOption=[
    {name:"ASCENDING ORDER",value:"ASC"},
    {name:"DESCENDING ORDER",value:"DESC"}
  ]


  
}
