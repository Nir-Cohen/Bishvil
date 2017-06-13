import {Observable} from 'rxjs/Observable';
import { Component, OnInit ,Input} from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { DialogService } from "ng2-bootstrap-modal";
import * as firebase from 'firebase';
import { TranslateService } from 'app/translation'
import {Injectable} from "@angular/core";

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  waitingUsers;

  public Header : string;

  constructor(public afService : AF,public af: AngularFire, private _translate: TranslateService) {
  
  }

  confirmUser(key){
    firebase.database().ref('registeredUsers/'+ key).update({status : '2'});
  //this.afService.currUserStatus = 2;
  }

  getUserList() : Observable<any[]>{
    return this.af.database.list("registeredUsers/").map(_user => _user.filter(user=> (user.status == undefined)));
  };


  isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
  }
  
  selectLang(lang: string) {
    // set default;
    //console.log(lang);
    this._translate.use(this.afService.choosen_lan);
    this.refreshText();
  }

  refreshText() {
    this.Header = this._translate.instant('No user to confirm');
  }

  ngOnInit() {
    this.waitingUsers = this.getUserList();
    this.selectLang('EN');
    
  }
}