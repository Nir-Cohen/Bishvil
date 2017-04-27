import { Component, OnInit} from '@angular/core';
import {HostFormComponent} from 'app/host-form/host-form.component';
import {AF} from 'providers/af';
import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FirebaseObjectFactoryOpts} from "angularfire2/interfaces";


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  
})
export class HostComponent implements OnInit {
  
  public hosting: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  constructor(public afService: AF,public af: AngularFire) { 
    this.hosting = this.afService.hosting;
    this.users = this.af.database.list("registeredUsers");
  }
  deleteItem(key : string){
    console.log("Removing "+ key);
    this.hosting.remove(key);
   }



  ngOnInit() {
  }

  onClick()
  {
    alert("Hello");
  }

}

