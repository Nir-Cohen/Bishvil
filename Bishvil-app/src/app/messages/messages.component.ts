import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

  users : any;

  message : string;
  sendTo : any;
  myMessages : any;
  nameList = [];
  recievedFrom = [];
  filteredList : any;

  constructor(public afService : AF,public af: AngularFire) {
    this.users = this.af.database.list('registeredUsers');
    this.sendTo = "";
    this.myMessages = this.af.database.list("registeredUsers/" + this.afService.currUserID + "/mess" , {query : {orderByChild : 'order'}});
   }

   sendMessage(){
      if(this.sendTo == "" || this.message == "" || !(this.message) )
        return;
        
      var ref = firebase.database().ref("registeredUsers/" + this.sendTo + "/mess");
      var message = {
        message: this.message,
        sentbyID: this.afService.currUserID,
        sentbyName : this.afService.currUserName,
        email: firebase.auth().currentUser.email,
        timestamp: Date.now(),
        read : false,
        order : -1 * new Date().getTime()
      };
      ref.push(message);      
   }; 
     
  getUserID(username){
    //get the key of the user
    firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        if(username == snap.val().name)
            this.sendTo =  snap.key ;
        return false;
      });
    });
  };

  deleteMessage(key : string){
    this.af.database.list("registeredUsers/" + this.afService.currUserID + "/mess").remove(key);
  };

  replay(sendTo){
    console.log(sendTo);
  };

  readMessage(key : string){
      firebase.database().ref('registeredUsers/'+ this.afService.currUserID + "/mess/" + key).update({read : true});      
  };

  filterMessages(sender){
      this.myMessages = this.getFilteredList(sender);
  };

  getFilteredList(author) : Observable<any[]>{
    if(author == undefined || author == "" || author == "(none)")
      return this.af.database.list('registeredUsers/' + this.afService.currUserID + "/mess");
    else
        return this.af.database.list('registeredUsers/'  + this.afService.currUserID + "/mess").map(_message => _message.filter(message=> message.sentbyName == author))    
   };

  ngOnInit() {
    //get user's name list
    firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        this.nameList.push(snap.val().name);
        return false;
      });
    });
    //get user's name list that send me message
    this.recievedFrom.push("(none)");
    firebase.database().ref("registeredUsers/"+ this.afService.currUserID + "/mess/").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        this.recievedFrom.push(snap.val().sentbyName);
        return false;
      });
    });    
  }
}
