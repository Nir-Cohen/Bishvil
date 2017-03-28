import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {AF} from 'providers/af'
@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.component.html',
  styleUrls: ['./host-form.component.css']
})
export class HostFormComponent implements OnInit {
  public host: host;

  constructor(public afService: AF) {  }

  ngOnInit() {
    this.host = { location: "", time: "", note: "" };
  }

  addHosting(){
    this.afService.addHosting(this.host);
  }
}

export class host{
  location: string;
  time: string;
  note: string;
}

