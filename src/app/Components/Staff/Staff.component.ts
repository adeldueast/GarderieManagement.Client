import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { SignalRService } from 'src/app/shared/services/http/hub/signal-r.service';
import { UsersService } from 'src/app/shared/services/http/users.service';
import { ModalStaffCreateComponent } from '../modals/modal-staff-create/modal-staff-create.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nom'];
  staff: any[] = [];
  dataSource = new MatTableDataSource(this.staff);

  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private signalRService: SignalRService,
    public authService:AuthService
  ) {}
  ngOnDestroy(): void {
    this.signalRService.removeNotifyUserStatusChangesListener();
  }

  ngOnInit() { console.clear()
    this.getAllStaff();
    this.dataSource = new MatTableDataSource(this.staff);
    this.signalRService.addNotifyUserStatusChangesListener(
      this.getAllStaff.bind(this)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllStaff() {
    this.userService.getAllStaff('User/employees').subscribe({
      next: (res) => {
         ;

        this.staff = res.data;
        //console.log(this.staff);
        
        this.staff.sort(function(a, b){
          if(a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
          if(a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
          return 0;
      })
       

        this.dataSource = new MatTableDataSource(this.staff);
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('getting all child completed'),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalStaffCreateComponent);

    //get the value of the modal's form before it closes
    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
        const group = result.value;
        location.reload();
      }
    });
  }
   compare( a:any, b:any ) {
    if ( a.firstName < b.firstName ){
      return -1;
    }
    if ( a.firstName > b.firstName ){
      return 1;
    }
    return 0;
  }
}
