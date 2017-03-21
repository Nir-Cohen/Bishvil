import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-night-form',
  templateUrl: './night-form.component.html',
  styleUrls: ['./night-form.component.css']
})
export class NightFormComponent implements OnInit {
  public event: event;

  constructor() { }

  ngOnInit() {
    this.event = { location: "", time: "" };
  }

  addEvent(){
    console.log(this.event);
  }

}

export class event{
  location: string;
  time: string;
}

