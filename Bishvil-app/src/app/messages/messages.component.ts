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
      //this.myMessages = this.af.database.list("privateMessages" , {query : {orderByChild : 'order'}});
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
              if(snap.val().sentfromID == snap.val().senttoID && snap.val().senttoID == this.afService.currUserID)
                this.IDArray.unshift(snap.val().senttoID);
              else if(this.afService.currUserID == snap.val().sentfromID)
                this.IDArray.unshift(snap.val().senttoID);
              else if(this.afService.currUserID == snap.val().sendtoID)
                this.IDArray.unshift(snap.val().sentfromID);
              return false;
        })
      });

      this.IDArray = Array.from(new Set(this.IDArray));

      this.IDArray.forEach(_key =>{
        this.recievedFrom.push(this.getUserDetails(_key));
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
      var exist = false;
      this.recievedFrom.forEach(_user=>{
          if(_user["key"] == this.sendtoID)
              exist = true;
      });
      if(!exist)
          this.recievedFrom.unshift(this.getUserDetails(this.sendtoID));
      else{
        this.removeUserFromList(this.sendtoID);
        this.recievedFrom.unshift(this.getUserDetails(this.sendtoID));
        console.log(this.recievedFrom); 
      }
   }; 

  //get the key of the user name 
  getUserID(username) : void{    
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
  
  //delete all the chat from user
  deleteChat(user_key): void{
    firebase.database().ref("privateMessages").once("value").then(_messages=>{
      _messages.forEach(_message=>{
          if((_message.val().senttoID == user_key && _message.val().sentfromID == this.afService.currUserID) || (this.afService.currUserID == _message.val().senttoID && _message.val().sentfromID == user_key))
              this.af.database.list("privateMessages").remove(_message.key);
      })     
    });
    this.removeUserFromList(user_key);
  };

  removeUserFromList(user_key) : void{
    var i = 0, keepLoop = true;
    this.recievedFrom.forEach(_user=>{
      if(keepLoop){
        if(_user["key"] == user_key)
          keepLoop = false;
        else
          i++;        
      }
    });
    this.recievedFrom.splice(i,1);
  };

  deleteMessage(key : string) : void{
    this.af.database.list("privateMessages").remove(key);
  };

  getMessages(key) : void{
      this.myMessages = this.getFilteredList(key);
  };
  
  getFilteredList(fromUser) : Observable<any[]>{
        return this.af.database.list("privateMessages/").map(_message => _message.filter(message=> ((message.sentfromID == fromUser && message.senttoID == this.afService.currUserID) || (message.sentfromID ==this.afService.currUserID && message.senttoID == fromUser))));
   };

   //change active divs
   showDiv(key) : void{
     Object.keys(this.hideDiv).forEach(h => {
       this.hideDiv[h] = false;
     })
     this.hideDiv[key] = true;
     this.getMessages(key);
   }

   //return object user user id,name,photo
   getUserDetails(_key) : Object{
    var obj={};
    var keepLoop = true;
    firebase.database().ref("registeredUsers").once("value").then(data=>{
      if(keepLoop){
        data.forEach(_obj=>{          
          if(_obj.key == _key){
            obj["name"] = _obj.val().name;
            obj["key"] = _obj.key;
            obj["photo"] = _obj.val().photoURL;
            keepLoop = false;
          }          
        })
      }                  
    });
    return obj;
   }
}