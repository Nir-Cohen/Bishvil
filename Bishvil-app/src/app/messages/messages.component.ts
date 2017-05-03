import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import * as firebase from 'firebase';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  users : FirebaseListObservable<any>;

  message : string;
  sendTo : any;
  myMessages : any;

  constructor(public afService : AF,public af: AngularFire) {
    this.users = this.af.database.list('registeredUsers');
    this.sendTo = "";
    this.myMessages = this.af.database.list("registeredUsers/" + this.afService.currUserID + "/mess");
    // firebase.database().ref();
    console.log(this.myMessages);
   }

   sendMessage(){
      console.log(this.sendTo);
      var ref = firebase.database().ref("registeredUsers/" + this.sendTo + "/mess");
      var message = {
        message: this.message,
        sentbyID: this.afService.currUserID,
        sentbyName : this.afService.currUserName,
        email: firebase.auth().currentUser.email,
        timestamp: Date.now()
      };
      console.log(message);
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

  ngOnInit() {
  }

}
