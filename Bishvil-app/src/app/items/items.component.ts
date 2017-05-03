import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import * as firebase from 'firebase';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],  
})
export class ItemsComponent implements OnInit {

  public items : FirebaseListObservable<any>;
  public users : FirebaseListObservable<any>;
  selected : any;

  onclick : Function;
  selectedRow : Number;

  constructor(public afService : AF,public af: AngularFire) {     
      this.items = this.afService.item; 
      this.users = this.af.database.list("registeredUsers");
  }

   //remove item ONLY AUTHOR ALLOW TO DELETE
   deleteItem(key : string){
    console.log("Removing "+ key);
    this.items.remove(key);
   }



  ngOnInit(){
    this.onclick = function(event : MouseEvent,i : any){
      console.log(event.target);
      this.selectedRow = i;
    };


  }
}
