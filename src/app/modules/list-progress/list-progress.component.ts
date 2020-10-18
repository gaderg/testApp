import {Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-progress',
  templateUrl: './list-progress.component.html',
  styleUrls: ['./list-progress.component.scss']
})
export class ListProgressComponent implements OnInit, DoCheck, OnChanges{
  @Input('userData') showdata;
  femaleCount = 0;
  maleCount = 0;
  progress:any = 0;
  bool = true;
  constructor() { }
  
  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this.femaleCount = this.showdata.filter(res => res.gender.toLowerCase() == 'female' ).length;
    this.maleCount = this.showdata.length - this.femaleCount;
    this.progress = this.showdata.length * 10+"%";
  }
  ngDoCheck(): void {
   
  }
  
}
