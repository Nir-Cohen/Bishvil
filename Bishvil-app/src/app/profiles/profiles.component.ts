import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  public users : FirebaseListObservable<any>;
  cityList = [];
  public filteredList : any;

  constructor(public afService : AF, public af : AngularFire) {
      this.users = this.af.database.list('registeredUsers');      
   }

   getFilteredItems(city){
     this.filteredList = this.getFilteredList(city);     
   };

   getFilteredList(city) : Observable<any[]>{
      if(city == undefined || city == "" || city == "(none)")
        return this.af.database.list('registeredUsers');
      else
          return this.af.database.list('registeredUsers').map(_user => _user.filter(user=> user.city == city))    
   };

   deleteUser(key,name){
     console.log(name);
     if(confirm("Are You sure you want to delete " + name +"?")){
        this.af.database.list("registeredUsers").remove(key);
     }
   };

   statusChanged($event, key){
    if($event.target.value =="Admin")
      firebase.database().ref('registeredUsers/'+ key).update({status : "1"});
    if($event.target.value =="User")
      firebase.database().ref('registeredUsers/'+ key).update({status : "0"});
   };

  ngOnInit() {
    this.cityList.push("(none)");
    firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        if(snap.val().city != "" && snap.val().city != undefined)
          this.cityList.push(snap.val().city);
        return false;
      });
    });
    this.getFilteredItems("");    
  }

}








