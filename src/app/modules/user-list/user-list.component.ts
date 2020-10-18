import { Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserServiceService } from './../../services/user-service.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, DoCheck, OnChanges {
  usersArray = [];
  @Output() sendData = new EventEmitter();
  
  constructor(private getData: UserServiceService) {
  }
  ngDoCheck(): void {
    
  }
  ngOnInit(): void {
    this.getData.refershData.subscribe(()=>{
      this.bindData();
    });
    this.bindData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("chnaged console file sddf")
  }
  bindData() {
    this.getData.getUserData().subscribe((data) => {
      this.usersArray = data;
      this.sendData.emit(data);
    });
  }
}
