import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";
import * as firebase from 'firebase';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  
})
export class ItemsComponent implements OnInit {

  public items : FirebaseListObservable<any>;

  isCollapsed : Boolean
  onclick : Function;
  selectedRow : Number;
  currUser :String;

  constructor(public afService : AF) {
     
      this.items = this.afService.item;
      this.currUser = firebase.auth().currentUser.displayName;
      this.onclick = function(event : MouseEvent,i : any){
        console.log(event.target);
        this.selectedRow = i;
        alert(i);
      };
   }
   
   delete(key : string){
    console.log(key);
    this.items.remove(key);
   }


  ngOnInit() {
  }

}
