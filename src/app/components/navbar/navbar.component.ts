import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FBloginComponent } from '../fblogin/fblogin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarOpen: boolean = false;
  userName: any;
  password: any;

  constructor(private dialog: MatDialog) { }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FBloginComponent, {
      data: {name: this.userName, pswd: this.password}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userName = result;
      console.log(result);
    });
  }
}


