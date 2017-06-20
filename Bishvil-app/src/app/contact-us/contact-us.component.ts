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
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, AfterViewChecked {

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
      // this.hideDiv = {};
      //this.users = this.af.database.list('registeredUsers');
      //this.myMessages = this.af.database.list("privateMessages" , {query : {orderByChild : 'order'}});
   }

  ngOnInit() {
  }
  ngAfterViewChecked(){

  }

 
   sendMess() : void{
     var sentFrom,sentFromID;
     
      var adminList = this.getAdminList();

      var ref = firebase.database().ref("privateMessages");
      adminList.forEach(key=>{
        var messageToPush = {
          message: this.message,
          sentfromID: this.afService.currUserID,        
          sentfromName :this.afService.currUserName,
          senttoID : key,
          senttoName : "Contact Us Message",
          timestamp: Date.now(),
          order : -1 * new Date().getTime()
        };
        ref.push(messageToPush);
      });
      

   }

   getAdminList() {//:} Observable<any[]>{
      var arr = [];// : string[];
      firebase.database().ref("registeredUsers").orderByValue().on("value" ,(data)=>{
        data.forEach((snap) =>{
            if(snap.val().status == 1)
            arr.push(snap.key);
            return false;
          });
        });
      return arr;
   };  

}