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


countries:Array<Object>  = [
       {id: 1, name: "Hebrew"},
       {id: 2, name: "French"},
       {id: 3, name: "English"},
       {id: 4, name: "Moroccan"},
       {id: 5, name: "Arabic"},
     ];
selectedValue = null;
  constructor(public afService: AF) {  }

  ngOnInit() {
    this.host = { 
      location: "",
      time: "",
      note: "",
      author:"",
      lastName:"",
      firstName:"",
      phoneOne:"",
      phoneTwo:"",
      lang:"",
     numberHost:"",
    };
  }

  addHosting(){
    this.afService.addHosting(this.host);
  }
}

export class host{
  location: string;
  time: string;
  note: string;
  author: string;
  firstName: string;
  lastName: string;
  phoneOne:any;
  phoneTwo:any;
  lang:any;
  numberHost:any;
}

