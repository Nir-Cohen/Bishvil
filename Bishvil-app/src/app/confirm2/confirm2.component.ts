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
    var event = this.af.database.object('/events/'+this.afService.OK_key); // How to get value
    event.subscribe(snapshot => {  
      this.obj = snapshot;      
    this.counter = snapshot.numberOfJoin; 
    this.userArr = snapshot.userArr;
  });


      this.af.database.object('/events/'+this.afService.OK_key).update({numberOfJoin : this.counter});
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
       console.log(this.userArr); 
       this.af.database.object('/events/'+this.afService.OK_key).update({userArr :this.userArr});
       this.close();
     }
     else
     {
       alert("you are already in this events");
       this.close();
       return;

     }




  }
  cancel() {
    this.result = false;
    this.close();
  }
}
