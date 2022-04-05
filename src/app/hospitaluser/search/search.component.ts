import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/User';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  queryField: FormControl = new FormControl();
  receipent:  FormControl = new FormControl();

  public userQueryForm: FormGroup = new FormGroup({
    queryField: this.queryField,
    receipent: this.receipent
  });

  users: User[] = [];

  @Output() public childEvent = new EventEmitter();
  
  constructor(private searchService: SearchService) { }
 ngOnInit() {
  this.queryField.valueChanges
  .subscribe( result => console.log(result));
 
   this.queryField.valueChanges
 
 .subscribe((queryField: string) =>this.searchService.getUserWithName(queryField)
 .subscribe((response:User[]) => response.forEach(e=>this.users.push(e))));
  }

  public refreshUserArray():void{
    
    this.users.splice(0,this.users.length);
  } 

  public emitUser(user:User):void{
    this.childEvent.emit(user);
  }


 
}

