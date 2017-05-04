import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public users : FirebaseListObservable<any>;

  constructor(public afService : AF, public af : AngularFire) {

      this.users = this.af.database.list('registeredUsers');
   }
  ngOnInit() {
  }

}








