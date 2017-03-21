import { Component, OnInit, Input } from '@angular/core';
import {AF} from 'providers/af';
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-night-form',
  templateUrl: './night-form.component.html',
  styleUrls: ['./night-form.component.css']
})
export class NightFormComponent implements OnInit {

  public events: FirebaseListObservable<any>;
  public event: event;

  constructor(public afService: AF) {
    this.events = this.afService.event;

  }

  ngOnInit() {
    this.event = { location: "", time: "", note: "" };
  }

  addEvent(){
    this.afService.addEvent(this.event);
  }

}

export class event{
  location: string;
  time: string;
  note: string;
}

