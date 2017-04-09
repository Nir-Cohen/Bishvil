import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user : FirebaseListObservable<any>;
  constructor(private afService: AF, private router: Router) {
     // this.user = this.af.database.object('users/' + auth.uid);
   }

  updateProfile(event, name, city, phoneNum, DOB){

  }

  cancel(){

  }

  ngOnInit() {
  }



}
