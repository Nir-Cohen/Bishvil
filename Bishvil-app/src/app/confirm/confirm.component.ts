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
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})


export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  counter: any;
  public hosting: FirebaseListObservable<any>;
  
  public ConfirmCounter: ConfirmCounter;
  constructor(public af: AngularFire,public afService: AF,dialogService: DialogService) {
    super(dialogService);
    this.hosting = this.afService.hosting;
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    var host = this.af.database.object('/hosting/'+this.afService.OK_key,{ preserveSnapshot: true}); // How to get value
    host.subscribe(snapshot => {          
    this.counter = snapshot.val().counter;   
  });
    this.counter=this.counter+1;
    this.af.database.object('/hosting/'+this.afService.OK_key).update({counter : this.counter});
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
}
