import { Component, OnInit} from '@angular/core';
import {HostFormComponent} from 'app/host-form/host-form.component';
//import {FirebaseListObservable} from "angularfire2";
import {AF} from 'providers/af';
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";
//import * as firebase from 'firebase';



@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  
})
export class HostComponent implements OnInit {
  
  public hosting: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public flag;
  constructor(public afService: AF,public af: AngularFire) { 
    this.hosting = this.afService.hosting;
    this.users = this.af.database.list("registeredUsers");
    //console.log("from host"+firebase.auth().currentUser.status);
    console.log("from host"+afService.status);
     console.log("from host"+this.hosting);
  }
  deleteItem(key : string){
    console.log("Removing "+ key);
    this.hosting.remove(key);
   }



  ngOnInit() {
  }

  

}
