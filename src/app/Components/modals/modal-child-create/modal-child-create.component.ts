import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/shared/services/http/group.service';
interface Group {
  id: number | null;
  name: string;
}
@Component({
  selector: 'app-modal-child-create',
  templateUrl: './modal-child-create.component.html',
  styleUrls: ['./modal-child-create.component.css'],
})
export class ModalChildCreateComponent implements OnInit {
  groups: Group[] = [{ id: 0, name: 'No group' }];
  
  public form: FormGroup = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    dateOfBirth: new FormControl('',Validators.required),
    groupId: new FormControl(this.groups[0].id,Validators.required),
  });



  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups() {
    this.groupService.getAllGroups('Group/Get').subscribe({
      next: (res) => {
        //  
        res.data.forEach((g: any) => {
          let group = {
            id: g.id,
            name: g.name,
          };
          this.groups.push(group);
        });
       // console.log(this.groups);
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log('fetching all groups completed');
      },
    });
  }

  compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id);
   }
}
