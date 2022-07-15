
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { FormControl } from '@angular/forms';
  import { MatOption } from '@angular/material/core';
  import { MatSelect } from '@angular/material/select';
  import { ChildrenService } from 'src/app/shared/services/http/children.service';
  
  @Component({
    selector: 'app-modal-grouped-children',
    templateUrl: './modal-grouped-children.component.html',
    styleUrls: ['./modal-grouped-children.component.css'],
  })
  export class ModalGroupedChildrenComponent implements OnInit {
  
  
    pokemonControl = new FormControl('');

    allSelected = false;

    @ViewChild('mySel') skillSel!: MatSelect;


  
    childrensGroups: any[] = [];
  
    constructor(private childrenService: ChildrenService) {}
  
    ngOnInit() {
      this.getChildren();
  
    }

    doSomething(e: any) {
      console.log(e);
    }

    toggleAllSelection() {
      this.allSelected = !this.allSelected;  // to control select-unselect
      
      if (this.allSelected) {
        this.skillSel.options.forEach( (item : MatOption) => item.select());
      } else {
        this.skillSel.options.forEach( (item : MatOption) => {item.deselect()});
      }
      // this.skillSel.close();
    }
    getChildren() {
      this.childrenService.getChildren('Enfant/GetAll').subscribe({
        next: (res) => {
        
          this.childrensGroups  = res.data.reduce(function (group:any, enfant:any) {
            group[enfant.group] = group[enfant.group] || [];
            group[enfant.group].push(enfant);
            return group;
        }, Object.create(null));
  
        console.log(this.childrensGroups);
        
        },
  
        error: (err) => [
          console.error(err),
          //console.error(err.error.errors),
          alert(JSON.stringify(err.error.errors)),
        ],
        complete: () => console.log('getting all childs completed'),
      });
    }
  }
  