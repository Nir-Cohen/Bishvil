import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {AF} from 'providers/af';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
import * as firebase from 'firebase';

export interface ConfirmModel {
  title:string;
  message:string;
}
export class ConfirmCounter{
  counter: any;
}


@Component({
  selector: 'app-confirm2',
  templateUrl: './confirm2.component.html',
  styleUrls: ['./confirm2.component.css']
})


export class Confirm2Component extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  counter: number;
  maxOfGusts=0;
  userArr=[];
  obj;
  bool = true;
  eventOwnerID;
  eventOwnerName;
  location;


  public events: FirebaseListObservable<any>;
  
  public ConfirmCounter: ConfirmCounter;
  constructor(public af: AngularFire,public afService: AF,dialogService: DialogService) {
    super(dialogService);
    this.events = this.afService.hosting;
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    firebase.database().ref('events/'+this.afService.OK_key).once('value')
            .then((snapshot)=>{
              //this.obj = snapshot;      
             this.counter = snapshot.val().numberOfJoin; 
              this.userArr = snapshot.val().userArr;
              this.eventOwnerID = snapshot.val().authorID;
              this.eventOwnerName = snapshot.val().authorName;
              this.location = snapshot.val().location;
              
    }).then(func=>{
        this.af.database.object('events/'+this.afService.OK_key).update({numberOfJoin : this.counter});
        var i = 0;
        for(i=0;i<this.userArr.length;i++)
        {
            if(this.afService.displayName==this.userArr[i])
            {
              this.bool = false;
            }
        }
        if(this.bool == true)
        {
          this.userArr.push(this.afService.displayName);
          this.sendMess(this.eventOwnerName, this.eventOwnerID);
          this.af.database.object('/events/'+this.afService.OK_key).update({userArr :this.userArr});
          this.close();
        }
        else
        {
          alert("you are already in this events");
          this.close();
          return;
        }
    });
  }

  sendMess(sendTo, sendToID) : void{
      var ref = firebase.database().ref("privateMessages/");
      var messageToPush = {
        message: "Hi, I joined your event at " + this.location + ", Hope to see you!",
        sentfromID: this.afService.currUserID,        
        sentfromName :this.afService.currUserName,
        senttoID : sendToID,
        senttoName : sendTo,
        timestamp: Date.now(),
        order : -1 * new Date().getTime()
      };
      ref.push(messageToPush);
      console.log("Message sent to event owner!");
   }

  cancel() {
    this.result = false;
    this.close();
  }
}
