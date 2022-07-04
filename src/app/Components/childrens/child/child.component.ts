import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from 'src/app/shared/services/http/children.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  //Todo: using a service would be better instead of having multiples instance of child_info in each tabs
  child_info: any = {};

  constructor(
    private childrenService: ChildrenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.child_info.id = params['id'];
    });
    this.getChild();
   // console.log(this.child_info);
  }

  getChild = () => {
    this.childrenService
      .getChild(`Enfant/Get/${this.child_info.id}`)
      .subscribe({
        next: (res) => {

          this.child_info.image = res.data.image;
          this.child_info.nom = res.data.nom;
          this.child_info.birthdate = res.data.dateNaissance;
          this.child_info.groupId = res.data.group ? res.data.group.id : 0;

          console.log('CHILD_INFO',this.child_info);
        },
  
        
      });
  };


}
