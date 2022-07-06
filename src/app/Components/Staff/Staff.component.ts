import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/shared/services/http/users.service';
import { ModalStaffCreateComponent } from '../modals/modal-staff-create/modal-staff-create.component';

@Component({
  selector: 'app-Staff',
  templateUrl: './Staff.component.html',
  styleUrls: ['./Staff.component.css'],
})
export class StaffComponent implements OnInit {
  displayedColumns: string[] = [ 'nom'];
  staff: any[] = [];
  dataSource = new MatTableDataSource(this.staff);

  constructor(private dialog: MatDialog, private userService: UsersService) {}

  ngOnInit() {
    this.getAllStaff();
  this.dataSource = new MatTableDataSource(this.staff);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllStaff() {
    this.userService
      .getAllStaff('User/employees')
      .subscribe({
        next: (res) => {
          console.log(res);
          
          this.staff = res.data;
          this.dataSource = new  MatTableDataSource(this.staff);
          
          
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
        location.reload()
      }
   
    });
  }
}
