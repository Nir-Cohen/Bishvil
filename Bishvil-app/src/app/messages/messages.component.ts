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
  hasAdminMessage : boolean;

  constructor(public afService : AF,public af: AngularFire) {
      this.hideDiv = {};
      this.users = this.af.database.list('registeredUsers');
      this.sendtoID = "";
      this.hasAdminMessage = false;
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
      if(this.afService.currUserStatus == 1)
        this.nameList.unshift("Broadcast");

        //get user's name list that send me message
        firebase.database().ref("privateMessages").orderByValue().on("value" ,(data)=>{
          data.forEach((snap) =>{
                if(snap.val().sentfromName == "Bisvhil-Admin" && snap.val().senttoID == this.afService.currUserID)
                  this.hasAdminMessage = true;                
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
        if(this.hasAdminMessage)
          this.IDArray.unshift("Bishvil Admin");
        this.IDArray.forEach(_key =>{
          if(_key == "Bishvil Admin")
            this.recievedFrom.push({"name" : "Bishvil Admin","key" : "" ,"photo" : "https://raw.githubusercontent.com/Nir-Cohen/Bishvil/master/logo.png"})
          else
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
      //make fields empty
      this.message = "";
      this.newMessage = "";
      this.model1 = "";

      //Broadcast message      
      if(this.sendtoName == "Broadcast"){
        firebase.database().ref("registeredUsers/").orderByValue().on("value" ,(data)=>{
          data.forEach((snap) =>{
            this.sendMess(messagetoSend,snap.val().name, snap.key);
            return false;
          });
        });
        return;
      }
      
      //private message
      else{
        if(toName != "form")
          this.getUserID(toName);
        this.sendMess(messagetoSend, this.sendtoName,this.sendtoID);
      }

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
      }
   }; 

   sendMess(messagetoSend,sendTo, sendToID) : void{
     var sentFrom,sentFromID;
      if(this.sendtoName == "Broadcast"){
        sentFrom = "Bisvhil-Admin";
        sentFromID = "";
      }
      else{
        sentFrom = this.afService.currUserName;
        sentFromID = this.afService.currUserID;
      }
      var ref = firebase.database().ref("privateMessages/");
      var messageToPush = {
        message: messagetoSend,
        sentfromID: sentFromID,        
        sentfromName :sentFrom,
        senttoID : sendToID,
        senttoName : sendTo,
        timestamp: Date.now(),
        order : -1 * new Date().getTime()
      };
      ref.push(messageToPush);
   }

  //get the key of the user name 
  getUserID(username) : void{
    if(username == "Broadcast"){
      this.sendtoName = "Broadcast";
      return;
    }
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
     if(this.hideDiv[key]){
        this.hideDiv[key] = false;
        return;
     }
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