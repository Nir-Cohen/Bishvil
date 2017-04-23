import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public items : FirebaseListObservable<any>;

  constructor(public afService : AF) {

      this.items = this.afService.item;
   }
  ngOnInit() {
  }

}








