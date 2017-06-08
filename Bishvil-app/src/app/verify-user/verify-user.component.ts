
import {Observable} from 'rxjs/Observable';
import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';


@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  waitingUsers;

  constructor(public afService : AF,public af: AngularFire) {
    
    

   }

   confirmUser(key){
     firebase.database().ref('registeredUsers/'+ key).update({status : '2'});
          this.afService.currUserStatus = 2;
   }

   getUserList() : Observable<any[]>{
    return this.af.database.list("registeredUsers/").map(_user => _user.filter(user=> (user.status == undefined)));
   };

  ngOnInit() {
    this.waitingUsers = this.getUserList();
    console.log(this.waitingUsers.length);
  }

}
