import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {


  isLogin:boolean =false;
  signIn:boolean=false;
  signUp:boolean=false;

  constructor() { }

  ngOnInit() {
    this.signUp = true;
  }
  dosignIn(){
    this.signUp =false;
    this.signIn = true;
  }
  dosignUp(){
    this.signUp = true;
    this.signIn = false;
  }

}
