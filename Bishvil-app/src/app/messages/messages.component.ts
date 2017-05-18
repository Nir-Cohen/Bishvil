import { Component, OnInit ,Input, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
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
export class MessagesComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  users : any;

  message : string;
  sendtoID : any;
  sendtoName : any;
  myMessages : any;
  nameList = [];
  recievedFrom =[];
  filteredList : any;
  model1 : any;
  hideDiv : any;
  IDArray =[];
  userPhoto : any;
  newMessage : any;


  constructor(public afService : AF,public af: AngularFire) {
      this.hideDiv = {};
      this.users = this.af.database.list('registeredUsers');
      this.sendtoID = "";
      this.myMessages = this.af.database.list("privateMessages" , {query : {orderByChild : 'order'}});
   }

  ngOnInit() {
    //get user's name list for autocomplete
    firebase.database().ref("registeredUsers").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        this.nameList.push(snap.val().name);
        return false;
      });
    });

      //get user's name list that send me message
      firebase.database().ref("privateMessages").orderByValue().on("value" ,(data)=>{
        data.forEach((snap) =>{
              if(this.afService.currUserID == snap.val().sentfromID || this.afService.currUserID == snap.val().senttoID){
                this.IDArray.push(snap.val().sentfromID);
                this.IDArray.push(snap.val().senttoID);
              }
              return false;
      })});
      this.IDArray = Array.from(new Set(this.IDArray));

      this.IDArray.forEach(_key =>{
          firebase.database().ref("registeredUsers").once("value").then(data=>{
            data.forEach(_obj=>{
             if(_obj.key == _key)
                this.recievedFrom.push({"name" : _obj.val().name, "key" :_obj.key, "photo" : _obj.val().photoURL});
                return false;
            })
            return false;              
          });
      });
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

   sendMessage(messagetoSend, toName){
      if(messagetoSend == "" || messagetoSend == undefined)
        return;
      this.getUserID(toName);
      var ref = firebase.database().ref("privateMessages/");
      var messageToPush = {
        message: messagetoSend,
        sentfromID: this.afService.currUserID,
        sentfromName : this.afService.currUserName,
        senttoID : this.sendtoID,
        senttoName : this.sendtoName,
        timestamp: Date.now(),
        order : -1 * new Date().getTime()
      };
      ref.push(messageToPush);
      this.message = "";
      this.newMessage = "";
      this.model1 = "";
   }; 
     
  getUserID(username){
    //get the key of the user
    firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
      data.forEach((snap) =>{
        if(username == snap.val().name){
            this.sendtoID =  snap.key ;
            this.sendtoName = snap.val().name;
            this.userPhoto = snap.val().photoUrl;
        }
        return false;
      });
    });
  };

  deleteMessage(key : string){
    this.af.database.list("privateMessages").remove(key);
  };

  getMessages(sender){
      this.recievedFrom.forEach(_name =>{
        if(_name["name"] == sender)
          sender = _name["key"];        
      });
      this.myMessages = this.getFilteredList(sender);
  };

  getFilteredList(fromUser) : Observable<any[]>{
    if(fromUser == undefined || fromUser == "" || fromUser == "(none)")
      return this.af.database.list('privateMessages/');
    else
        return this.af.database.list("privateMessages/").map(_message => _message.filter(message=> ((message.sentfromID == fromUser && message.senttoID == this.afService.currUserID) || (message.sentfromID ==this.afService.currUserID && message.senttoID == fromUser))));
   };

   showDiv(key){
     Object.keys(this.hideDiv).forEach(h => {
       this.hideDiv[h] = false;
     })
     this.hideDiv[key] = true;
     this.getMessages(key);
   } 
}
