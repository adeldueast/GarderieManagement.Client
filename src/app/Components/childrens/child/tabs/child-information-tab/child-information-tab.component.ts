import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { GroupService } from 'src/app/shared/services/http/group.service';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-child-information-tab',
  templateUrl: './child-information-tab.component.html',
  styleUrls: ['./child-information-tab.component.css'],
})
export class ChildInformationTabComponent implements OnInit {
  @Input() child_info!: any;
  updateForm!: FormGroup;

  groups: any[] = [{ id: 0, name: 'No Group' }];

  constructor(
    private childrenService: ChildrenService,
    private groupService: GroupService,
    public authService:AuthService
  ) {
    //console.log('information tab constructor');

  }

  ngOnInit() { console.clear()
    console.warn(this.child_info);
    
    this.updateForm = new FormGroup({
      id: new FormControl(this.child_info.id),
      nom: new FormControl(this.child_info.nom),
      dateNaissance: new FormControl(this.child_info.birthdate),
      groupId: new FormControl(this.child_info.groupId),
    });

    // console.log('xoxox',this.updateForm.value);

    this.updateForm.disable();
    this.getAllGroups();
    
  }

  getAllGroups = () => {
    this.groupService.getAllGroups(`Group/Get`).subscribe({
      next: (res) => {
        // console.log(res);
        res.data.forEach((g: any) => {
          let group = {
            id: g.id,
            name: g.name,
          };
          this.groups.push(group);
        });

        //console.log(this.groups);
      },
      error: (err) => console.log(err),
      complete: () => console.log('getting all groups completed'),
    });
  };

  //todo: replace reload
  onSubmit = () => [this.updateChild()]; //location.reload()

  toggleEdit() {
    if (this.updateForm.enabled) {
      //canceling
      this.updateForm.patchValue({
        nom: this.child_info.nom,
        dateNaissance: this.child_info.birthdate,
        groupId: this.child_info.groupId,
      });

      return this.updateForm.disable();
    }
    //updating
    this.updateForm.enable();
  }

  updateChild = () => {
    this.childrenService
      .updateChild('Enfant/Update', this.updateForm.value)
      .subscribe(
        //(res) => console.log(res)
        );
    
        this.updateForm.disable()
  };

  onChangeGroup(value: any) {
    //console.log(value);
    this.updateForm.patchValue({
      groupId: value,
    });
  }

  // https://stackoverflow.com/questions/56187371/angular-material-mat-select-default-value-when-using-reactive-forms
  compareFunction(o1: any, o2: any) {
    return o1.name == o2.name && o1.id == o2.id;
  }
}
