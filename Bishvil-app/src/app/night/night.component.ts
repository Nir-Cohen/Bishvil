import { Component, OnInit } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.css']
})
export class NightComponent implements OnInit {

  public events: FirebaseListObservable<any>;
  constructor(public afService: AF) { 
    this.events = this.afService.event;
  }

  ngOnInit() {
  }

}
