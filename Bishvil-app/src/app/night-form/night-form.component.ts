import { Component, OnInit, Input } from '@angular/core';
import {AF} from 'providers/af';

@Component({
  selector: 'app-night-form',
  templateUrl: './night-form.component.html',
  styleUrls: ['./night-form.component.css']
})
export class NightFormComponent implements OnInit {
  public event: event;
  constructor(public afService: AF) {
    

  }

  ngOnInit() {
    this.event = { location: "", time: "" };
  }

  addEvent(){
    this.afService.addEvent();
  }

}

export class event{
  location: string;
  time: string;
}

