import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import * as firebase from 'firebase';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.css']
})
export class NightComponent implements OnInit {
  public users: FirebaseListObservable<any>;
  public events: FirebaseListObservable<any>;
  constructor(public afService: AF, public af:AngularFire) { 
    this.events = this.afService.event;
    this.users = this.af.database.list("registeredUsers");
    
  }

  ngOnInit() {
  }
  
  deleteItem(key: any)
  {
    this.events.remove(key);
  }
}
